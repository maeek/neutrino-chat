import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import {
  setMobileBottomNavVisibility,
  setTopBarVisibility
} from '@/store/app/ui/actions';
import Navigator from '@/utils/navigation';
import ChannelInfo from './channel-info/channel-info';
import { Chat } from '../common/chat/chat';
import { MessageTypes } from '@/store/messages/types';
import { ComposeMessage } from '../common/chat/compose';
import classNames from 'classnames';
import './channel.scss';
import { InputRef } from '@maeek/neutrino-design/components/inputs/text/Input';
import { ActionButton } from '@maeek/neutrino-design';
import { getChannelById } from '@/selectors/channels';
import { ChannelPageParams } from '@/views/channel/Channel';
import { RootState } from '@/store/root';

export const ChannelView = () => {
  const { channel: channelName } = useParams<ChannelPageParams>();
  const location = useLocation<{ focusInput: boolean }>();
  const history = useHistory();
  const channel = useSelector((state: RootState) =>
    getChannelById(channelName, state)
  );
  const inputRef = useRef<InputRef>(null);
  const dispatch = useDispatch();
  const [ isInfoMinified, setIsInfoMinified ] = useState(true);

  const toggleVisibility = () => {
    if (isInfoMinified) {
      Navigator.back(history);
      return;
    }

    Navigator.forward(history, `/c/${channel.name}/chat`, {
      focusInput: true
    });
  };

  useEffect(() => {
    const state = location.pathname.endsWith('/chat');
    dispatch(setMobileBottomNavVisibility(state));
    setIsInfoMinified(state);

    if (location.state?.focusInput) inputRef.current?.element?.current?.focus();

    if (state) document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
      if (state) {
        dispatch(setMobileBottomNavVisibility(false));
        dispatch(setTopBarVisibility(false));
      }
    };
  }, [ dispatch, location ]);

  if (!channel) {
    return <></>;
  }

  return (
    <div
      className={classNames(
        'view-root view-root--channel',
        isInfoMinified && 'view-root--channel-minified'
      )}
    >
      <ChannelInfo
        channel={channel}
        isMinified={isInfoMinified}
        onToggle={toggleVisibility}
      />
      {isInfoMinified && (
        <>
          <div className='view-root--channel--minified-move'>
            <Chat parentId={channel.name} type={MessageTypes.CHANNEL} />
          </div>
          <ComposeMessage
            ref={inputRef}
            parentId={channel.name}
            type={MessageTypes.CHANNEL}
            toggleVisibility={toggleVisibility}
            isMinified={isInfoMinified}
            showActions
          />
        </>
      )}
      {!isInfoMinified && (
        <div className='view-root--channel-cta'>
          <ActionButton onClick={toggleVisibility}>Send a Message</ActionButton>
        </div>
      )}
    </div>
  );
};

export default ChannelView;
