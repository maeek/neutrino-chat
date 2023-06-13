import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserById } from '@/selectors/users';
import UserAvatar from '@/components/common/user-components/avatar';
import { getHslColorFromCharCode } from '@/utils/getHslColorFromCharCode';
import { UserUsername } from '@/components/common/user-components/username';
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

dayjs.extend(relativeTime);

export interface UserDmListRowProps {
  id: string;
  style?: any;
  isScrolling?: boolean;
  measure?: () => void;
  onClick?: (id: string, type: MessageTypes) => void;
}

export const UserDmListRow = ({
  id,
  style,
  measure,
  isScrolling,
  onClick
}: UserDmListRowProps) => {
  const user = useSelector(getUserById(id));
  const isUnread = useSelector(areMessagesUnreadByParentId(user.id));
  const lastMessage = useSelector(getMessageById(user.lastMessage?.id));
  const unreadMessagesLength = useSelector(
    getMessagesUnreadForParent(user.id)
  )?.length;
  const history = useHistory();

  const handleClick = () => {
    if (onClick) {
      onClick(user.id, MessageTypes.DIRECT);
      return;
    }

    Navigator.forward(history, `/u/${user.id}/chat`, {
      isChat: true
    });
  };

  useEffect(() => {
    if (!measure) return;
    return measure();
  }, [measure]);

  const renderLastMessage = () => {
    if (!lastMessage) {
      return '';
    }

    const sender = lastMessage.senderId !== user.id ? 'You: ' : `${user.id}: `;

    if (lastMessage.attachments.length > 0) {
      return (
        <i>
          {lastMessage.senderId !== user.id ? 'You ' : `${user.id} `} sent an
          attachment
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
      <UserAvatar
        loader={null}
        status={user.status}
        size={'large'}
        key={user.avatar}
        url={user.avatar}
        username={user.id}
        color={getHslColorFromCharCode(user.id)}
      />
      <div
        className={classNames(
          'dm-list-row-data',
          user.lastMessage && isUnread && 'dm-list-row-data--unread'
        )}
      >
        <UserUsername username={user.id} />
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

export default UserDmListRow;
