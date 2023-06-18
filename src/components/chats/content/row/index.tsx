import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserById } from '@/selectors/users';
import UserAvatar from '@/components/common/user-components/avatar';
import { getHslColorFromCharCode } from '@/utils/getHslColorFromCharCode';
import Navigator from '@/utils/navigation';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import {
  areMessagesUnreadByParentId,
  getMessageById,
  getMessagesUnreadForParent
} from '@/selectors/messages';
import './row.scss';
import { MessageTypes } from '@/store/messages/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getChannelById } from '@/selectors/channels';
import { RootState } from '@/store/root';
import { Channel } from '@/store/channels/types';
import { User } from '@/store/users/types';
import { Heading } from '@maeek/neutrino-design';
import { getMeUsername } from '@/selectors/user';
import { NewReleasesRounded } from '@material-ui/icons';

dayjs.extend(relativeTime);

export interface DmListRowProps {
  id: string;
  type: MessageTypes;
  style?: any;
  isScrolling?: boolean;
  measure?: () => void;
  onClick?: (id: string, type: MessageTypes) => void;
}

export const DmListRow = ({
  id,
  style,
  measure,
  isScrolling,
  type,
  onClick
}: DmListRowProps) => {
  const username = useSelector(getMeUsername);
  const context = useSelector((state: RootState) => {
    if (type === MessageTypes.DIRECT) {
      return getUserById(id)(state);
    } else {
      return getChannelById(id, state);
    }
  });
  const actualId =
    type === MessageTypes.DIRECT
      ? (context as User).id
      : (context as Channel).name;
  const isUnread = useSelector(areMessagesUnreadByParentId(actualId));
  const lastMessage = useSelector(getMessageById(context.lastMessage?.id));
  const unreadMessagesLength = useSelector(
    getMessagesUnreadForParent(actualId)
  )?.length;
  const history = useHistory();

  const handleClick = () => {
    if (onClick) {
      onClick(actualId, type);
      return;
    }

    Navigator.forward(
      history,
      `/${type === MessageTypes.DIRECT ? 'u' : 'c'}/${actualId}/chat`,
      {
        isChat: true
      }
    );
  };

  useEffect(() => {
    if (!measure) return;
    return measure();
  }, [ measure ]);

  const renderLastMessage = () => {
    if (!lastMessage) {
      return '';
    }

    const sender =
      lastMessage.senderId === username
        ? 'You: '
        : lastMessage.type === MessageTypes.CHANNEL
          ? `${lastMessage.senderId}: `
          : '';

    if (lastMessage.attachments.length > 0) {
      return (
        <i>
          {lastMessage.senderId !== username
            ? 'You '
            : `${lastMessage.senderId} `}{' '}
          sent an attachment
        </i>
      );
    } else if (lastMessage?.body && lastMessage.body.length > 90) {
      return sender + lastMessage?.body.substring(0, 90) + '...';
    } else if (lastMessage?.body) {
      return sender + lastMessage?.body;
    }
  };

  return (
    <div
      className={classNames(
        'dm-list-row',
        isScrolling && 'dm-list-row--scrolling'
      )}
      onClick={handleClick}
      style={style}
      tabIndex={0}
    >
      {type === MessageTypes.DIRECT ? (
        <UserAvatar
          loader={null}
          size={'large'}
          key={(context as User).avatar}
          url={(context as User).avatar}
          username={actualId}
          color={getHslColorFromCharCode(actualId)}
        />
      ) : (
        <div className='dm-list-row-avatar'>
          {((context as Channel)?.users?.length || 0) > 9
            ? '9+'
            : (context as Channel)?.users?.length}
        </div>
      )}
      <div
        className={classNames(
          'dm-list-row-data',
          context.lastMessage && isUnread && 'dm-list-row-data--unread'
        )}
      >
        <Heading className='me-profile-username' level={3}>
          {actualId === username && type === MessageTypes.DIRECT ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span>Note to self</span>
              <NewReleasesRounded
                style={{
                  color: 'var(--clr-actions-400)',
                  marginLeft: '0.3rem',
                  fontSize: '1rem'
                }}
              />
            </div>
          ) : (
            actualId
          )}
        </Heading>
        <div className='dm-list-row-message'>{renderLastMessage()}</div>
        {unreadMessagesLength > 0 && (
          <div className='dm-list-row-unread'>{unreadMessagesLength}</div>
        )}
        <div className='dm-list-row-timestamp'>
          {dayjs(lastMessage.timeReceived).fromNow()}
        </div>
      </div>
    </div>
  );
};

export default DmListRow;
