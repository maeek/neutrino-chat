import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { getUserById } from '@/selectors/users';
import {
  setMobileBottomNavVisibility,
  setTopBarVisibility
} from '@/store/app/ui/actions';
import Navigator from '@/utils/navigation';
import { UserPageParams } from '@/views/user/User';
import UserInfo from './user-info/user-info';
import { Chat } from '../common/chat/chat';
import { MessageTypes } from '@/store/messages/types';
import { ComposeMessage } from '../common/chat/compose';
import classNames from 'classnames';
import './user.scss';
import { InputRef } from '@maeek/neutrino-design/components/inputs/text/Input';
import { ActionButton } from '@maeek/neutrino-design';

interface UserLocationState {
  isChat?: boolean;
}

export const UserView = () => {
  const { username } = useParams<UserPageParams>();
  const location = useLocation<{ focusInput: boolean }>();
  const history = useHistory();
  const user = useSelector(getUserById(username));
  const inputRef = useRef<InputRef>(null);
  const dispatch = useDispatch();
  const [isInfoMinified, setIsInfoMinified] = useState(true);

  const toggleVisibility = () => {
    if (isInfoMinified) {
      Navigator.back(history);
      return;
    }

    Navigator.forward(history, `/u/${user.id}/chat`, {
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
  }, [dispatch, location]);

  if (!user) {
    return <></>;
  }

  return (
    <div
      className={classNames(
        'view-root view-root--user',
        isInfoMinified && 'view-root--user-minified'
      )}
    >
      <UserInfo
        user={user}
        isMinified={isInfoMinified}
        onToggle={toggleVisibility}
      />
      {isInfoMinified && (
        <>
          <div className='view-root--user--minified-move'>
            <Chat parentId={user.id} type={MessageTypes.DIRECT} />
          </div>
          <ComposeMessage
            ref={inputRef}
            parentId={user.id}
            type={MessageTypes.DIRECT}
            toggleVisibility={toggleVisibility}
            isMinified={isInfoMinified}
            showActions
          />
        </>
      )}
      {!isInfoMinified && (
        <div className='view-root--user-cta'>
          <ActionButton onClick={toggleVisibility}>Send a Message</ActionButton>
        </div>
      )}
    </div>
  );
};

export default UserView;
