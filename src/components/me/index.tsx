import { useSelector } from 'react-redux';
import {
  getMeAvatar,
  getMeBio,
  getMeColor,
  getMeUsername
} from '@/selectors/user';
import UserAvatar from '@/components/common/user-components/avatar';
import UserUsername from '@/components/common/user-components/username';
import UserBio from '@/components/common/user-components/bio';
import ProfileQuickLinks from './quick-links';
import './me.scss';

export const ProfileView = () => {
  const username = useSelector(getMeUsername);
  const avatar = useSelector(getMeAvatar);
  const bio = useSelector(getMeBio);
  const color = useSelector(getMeColor);

  return (
    <div className='view-root view-root--me'>
      <div className='me-profile-content'>
        <UserAvatar
          url={avatar ? `/api/users/${username}/avatar` : undefined}
          username={username}
          color={color}
        />
        <UserUsername username={username} />
        <UserBio text={bio} />
        <ProfileQuickLinks />
      </div>
    </div>
  );
};

export default ProfileView;
