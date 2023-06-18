import LayoutContentFooter from '@maeek/neutrino-design/components/layouts/content-footer';
import MainSearchBar from '../common/search-bar/search-bar';
import UsersCards from './content/users';
import { useMediaQuery } from 'react-responsive';
import { Heading, LayoutSideContent, Text } from '@maeek/neutrino-design';
import { Chat } from '../common/chat/chat';
import { useEffect, useState } from 'react';
import { MessageTypes } from '@/store/messages/types';
import { ComposeMessage } from '../common/chat/compose';
import UserAvatar from '../common/user-components/avatar';
import { getHslColorFromCharCode } from '@/utils/getHslColorFromCharCode';
import { useSelector } from 'react-redux';
import { getUserById } from '@/selectors/users';
import { ForumRounded, MoreHorizRounded } from '@material-ui/icons';
import Navigator from '@/utils/navigation';
import { useHistory, useLocation } from 'react-router-dom';
import './chats.scss';
import DetailsButtonShowMore from '../user/details-buttons/details-more';

type SelectedConvoType = { id: string; type: MessageTypes };

export const ChatsView = () => {
  const history = useHistory();
  const { state } = useLocation<{ selectedConvo: SelectedConvoType }>();
  const isMobile = useMediaQuery({ maxWidth: 1224 });
  const [selectedConvo, setSelectedConvo] = useState<SelectedConvoType>();
  const user = useSelector(getUserById(selectedConvo?.id || ''));

  useEffect(() => {
    if (!isMobile && state?.selectedConvo) {
      setSelectedConvo(state.selectedConvo);
    }
  }, [isMobile, state]);

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
  }, [isMobile]);

  const navToUserDetails = () => {
    Navigator.forward(history, `/u/${user?.id}`);
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
                    console.log('selected convo', id, type);
                    setSelectedConvo({ id, type });
                    Navigator.forward(history, `/`, {
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
                  <UserAvatar
                    size={'small'}
                    url={user?.avatar}
                    key={user?.id}
                    username={user?.id}
                    color={getHslColorFromCharCode(user?.id || '')}
                  />
                  {user?.id}
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
