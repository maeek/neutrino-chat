import LayoutContentFooter from '@maeek/neutrino-design/components/layouts/content-footer';
import MainSearchBar from '../common/search-bar/search-bar';
import UsersCards from './content/users';
import { useMediaQuery } from 'react-responsive';
import { Heading, LayoutSideContent } from '@maeek/neutrino-design';
import { Chat } from '../common/chat/chat';
import { useEffect, useState } from 'react';
import { MessageTypes } from '@/store/messages/types';
import { ComposeMessage } from '../common/chat/compose';
import UserAvatar from '../common/user-components/avatar';
import { getHslColorFromCharCode } from '@/utils/getHslColorFromCharCode';
import { useSelector } from 'react-redux';
import { getUserById } from '@/selectors/users';
import { ForumRounded } from '@material-ui/icons';
import Navigator from '@/utils/navigation';
import { useHistory, useLocation } from 'react-router-dom';
import DetailsButtonShowMore from '../user/details-buttons/details-more';
import { getChannelById } from '@/selectors/channels';
import { RootState } from '@/store/root';
import { User } from '@/store/users/types';
import { Channel } from '@/store/channels/types';
import './chats.scss';

type SelectedConvoType = { id: string; type: MessageTypes };

export const ChatsView = () => {
  const history = useHistory();
  const { state } = useLocation<{ selectedConvo: SelectedConvoType }>();
  const isMobile = useMediaQuery({ maxWidth: 1224 });
  const [ selectedConvo, setSelectedConvo ] = useState<SelectedConvoType>();
  const ctx = useSelector((state: RootState) => {
    if (selectedConvo?.type === MessageTypes.DIRECT) {
      return getUserById(selectedConvo?.id || '')(state);
    } else {
      return getChannelById(selectedConvo?.id || '', state);
    }
  });

  useEffect(() => {
    if (!isMobile && state?.selectedConvo) {
      setSelectedConvo(state.selectedConvo);
    }
  }, [ isMobile, state ]);

  useEffect(() => {
    if (!isMobile) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('desktop-1224');
    } else {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('desktop-1224');
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('desktop-1224');
    };
  }, [ isMobile ]);

  const navToUserDetails = () => {
    Navigator.forward(
      history,
      `/${selectedConvo?.type === MessageTypes.DIRECT ? 'u' : 'c'}/${
        selectedConvo?.type === MessageTypes.DIRECT
          ? (ctx as User).id
          : (ctx as Channel).name
      }`
    );
  };

  return (
    <div className='view-root view-root--chats'>
      {isMobile ? (
        <LayoutContentFooter footerNode={null}>
          <MainSearchBar />
          <UsersCards />
        </LayoutContentFooter>
      ) : (
        <LayoutSideContent
          sideNode={
            <>
              <MainSearchBar />
              <UsersCards
                onSelected={(id, type) => {
                  if (!isMobile) {
                    setSelectedConvo({ id, type });
                    Navigator.forward(history, '/', {
                      selectedConvo: { id, type }
                    });
                  }
                }}
              />
            </>
          }
        >
          {selectedConvo ? (
            <>
              <div className='selected-convo-title'>
                <Heading level={3}>
                  {selectedConvo?.type === MessageTypes.DIRECT ? (
                    <UserAvatar
                      loader={null}
                      size={'small'}
                      key={(ctx as User).id + (ctx as User).avatar}
                      url={(ctx as User).avatar ? `/api/users/${(ctx as User).id}/avatar` : ''}
                      username={(ctx as User).id}
                      color={getHslColorFromCharCode((ctx as User).id)}
                    />
                  ) : (
                    <div
                      className='selected-convo-list-row-avatar'
                      style={{
                        color: getHslColorFromCharCode(
                          (ctx as Channel).name || ''
                        ),
                        textTransform: 'capitalize',
                        fontSize: 'var(--fs-400)'
                      }}
                    >
                      {(ctx as Channel).name.substring(0, 2)}
                    </div>
                  )}
                  {selectedConvo?.type === MessageTypes.DIRECT
                    ? (ctx as User).id
                    : (ctx as Channel).name}
                </Heading>
                <DetailsButtonShowMore isVisible onClick={navToUserDetails} />
              </div>
              <div className='view-root--user--minified-move'>
                <Chat parentId={selectedConvo?.id} type={selectedConvo?.type} />
              </div>
              <ComposeMessage
                parentId={selectedConvo.id}
                type={selectedConvo.type}
                showActions
              />
            </>
          ) : (
            <div
              style={{
                display: 'flex',
                marginTop: '5rem',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}
            >
              <ForumRounded
                style={{ fontSize: '4rem', color: 'var(--clr-actions-100)' }}
              />
              <Heading
                level={3}
                style={{
                  color: 'var(--clr-basic-300)',
                  width: '22ch',
                  textAlign: 'center'
                }}
              >
                Select a chat in the sidebar to start chatting
              </Heading>
            </div>
          )}
        </LayoutSideContent>
      )}
    </div>
  );
};

export default ChatsView;
