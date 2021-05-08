import { useSelector } from 'react-redux';
import { AvatarCached } from '@maeek/neutrino-design/components/atoms/avatar';
import Loader from '@maeek/neutrino-design/components/molecules/loaders/Loader';
import { EditRounded } from '@material-ui/icons';
import { getMeAvatar, getMeUsername } from '@/selectors/user';
import './avatar.scss';

export const ProfileAvatar = () => {
  const avatar = useSelector(getMeAvatar);
  const username = useSelector(getMeUsername);

  return (
    <AvatarCached
      className="me-profile-avatar"
      size="extra-large"
      src={avatar}
      name={username}
      loader={<Loader />}
    >
      <div className="me-profile-avatar-edit">
        <EditRounded />
      </div>
    </AvatarCached>
  );
};

export default ProfileAvatar;
