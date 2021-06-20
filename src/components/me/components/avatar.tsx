import { CSSProperties } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import { AvatarCached } from '@maeek/neutrino-design/components/atoms/avatar';
import Loader from '@maeek/neutrino-design/components/molecules/loaders/Loader';
import EditRounded from '@material-ui/icons/EditRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import { getMeAvatar, getMeColor, getMeUsername } from '@/selectors/user';
import './avatar.scss';

export const ProfileAvatar = () => {
  const avatar = useSelector(getMeAvatar);
  const username = useSelector(getMeUsername);
  const meColor = useSelector(getMeColor);

  const noAvatar = (
    <div
      className="me-profile-avatar-no-avatar"
      style={{ '--color': meColor } as CSSProperties}
    >
      <FaceRoundedIcon />
    </div>
  );

  return (
    <AvatarCached
      className={classnames('me-profile-avatar', !avatar && 'me-profile-avatar--empty')}
      size="extra-large"
      src={avatar}
      name={username}
      loader={<Loader />}
    >
      {!avatar && noAvatar}
      <div className="me-profile-avatar-edit">
        <EditRounded />
      </div>
    </AvatarCached>
  );
};

export default ProfileAvatar;
