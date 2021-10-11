import { getUserById } from '@/selectors/users';
import { getHslColorFromCharCode } from '@/utils/getHslColorFromCharCode';
import { UserPageParams } from '@/views/user/User';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserAvatar from '../common/user-components/avatar';
import UserBanner from '../common/user-components/banner';
import UsernameFull from '../common/user-components/username-full';
import './user.scss';

export const UserView = () => {
  const { username } = useParams<UserPageParams>();
  const user = useSelector(getUserById(username));

  return (
    <div className="view-root view-root--user">
      <div className="user-info">
        {user.banner && <UserBanner expandOnClick url={user.banner} />}
        <UserAvatar
          className={user.banner ? '' : 'reset-margin'}
          color={getHslColorFromCharCode(username)}
          url={user.avatar}
          expandOnClick
        />
        <UsernameFull
          nickname={user.nickname}
          id={username}
          name={user.name}
          status={user.status}
        />
        <div className="user-info-thumb" />
      </div>
    </div>
  );
};

export default UserView;
