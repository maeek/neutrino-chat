import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserById } from '@/selectors/users';
import UserAvatar from '@/components/common/user-components/avatar';
import { getHslColorFromCharCode } from '@/utils/getHslColorFromCharCode';
import { UserUsername } from '@/components/common/user-components/username';
import Navigator from '@/utils/navigation';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { areMessagesUnreadByParentId, getMessageById } from '@/selectors/messages';
import './row.scss';

export interface UserDmListRowProps {
  id: string;
  style?: any;
  isScrolling?: boolean;
  measure?: () => void;
}

export const UserDmListRow = ({ id, style, measure, isScrolling }: UserDmListRowProps) => {
  const user = useSelector(getUserById(id));
  const isUnread = useSelector(areMessagesUnreadByParentId(user.id));
  const lastMessage = useSelector(getMessageById(user.lastMessage?.id));
  const history = useHistory();

  const handleClick = () => {
    Navigator.forward(history, `/u/${user.id}/chat`, {
      isChat: true
    });
  };

  useEffect(() => {
    if (!measure) return;
    return measure();
  }, [ measure ]);

  const renderLastMessage = () => {
    if (!lastMessage) {
      return '';
    }

    const sender = lastMessage.senderId !== user.id ? 'You: ' : `${user.nickname || user.name}: `;

    if (lastMessage.attachments.length > 0) {
      return (
        <i>
          {lastMessage.senderId !== user.id ? 'You ' : `${user.nickname || user.name} `} sent an attachment
        </i>
      );
    }
    else if (lastMessage?.body && lastMessage.body.length > 90) {
      return sender + lastMessage?.body.substr(0, 90) + '...';
    }
    else if (lastMessage?.body) {
      return sender  + lastMessage?.body;
    }
  };

  return (
    <div
      className={classNames('dm-list-row', isScrolling && 'dm-list-row--scrolling')}
      onClick={handleClick}
      style={style}
      tabIndex={0}
    >
      <UserAvatar
        loader={null}
        size={'large'}
        url={user.avatar}
        username={user.name}
        color={getHslColorFromCharCode(user.name)}
      />
      <div className={classNames('dm-list-row-data', user.lastMessage && isUnread && 'dm-list-row-data--unread')}>
        <UserUsername username={user.nickname || user.name} />
        <div className="dm-list-row-message">
          {renderLastMessage()}
        </div>
      </div>
    </div>
  );
};

export default UserDmListRow;
