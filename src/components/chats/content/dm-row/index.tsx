import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserById } from '@/selectors/users';
import UserAvatar from '@/components/common/user-components/avatar';
import { getHslColorFromCharCode } from '@/utils/getHslColorFromCharCode';
import { UserUsername } from '@/components/common/user-components/username';
import Navigator from '@/utils/navigation';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import './dm-row.scss';

export interface UserDmListRowProps {
  id: string;
  style?: any;
  isScrolling?: boolean;
  measure?: () => void;
}

export const UserDmListRow = ({ id, style, measure, isScrolling }: UserDmListRowProps) => {
  const user = useSelector(getUserById(id));
  const history = useHistory();

  const handleClick = () => {
    Navigator.forward(history, `/u/${user.id}`, {
      isChat: true
    });
  };

  useEffect(() => {
    if (!measure) return;
    return measure();
  }, [ measure ]);

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
      <div className="dm-list-row-data">
        <UserUsername username={user.nickname || user.name} />
        <div className="dm-list-row-message">
          {
            user.lastMessage?.content && user.lastMessage?.content.length > 90
              ? user.lastMessage?.content?.substr(0, 90) + '...'
              : user.lastMessage?.content
          }
        </div>
      </div>
    </div>
  );
};

export default UserDmListRow;
