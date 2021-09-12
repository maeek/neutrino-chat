import { CSSProperties, MouseEventHandler } from 'react';
import classnames from 'classnames';
import { AvatarCached } from '@maeek/neutrino-design/components/atoms/avatar';
import Loader from '@maeek/neutrino-design/components/molecules/loaders/Loader';
import EditRounded from '@material-ui/icons/EditRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import './avatar.scss';

export interface UserAvatarProps {
  url?: string;
  username?: string;
  color?: string;
  editable?: boolean;
  onEdit?: MouseEventHandler;
}

export const UserAvatar = ({ url, username, color, editable, onEdit }: UserAvatarProps) => {
  const noAvatar = (
    <div
      className="me-profile-avatar-no-avatar"
      style={{ '--color': color } as CSSProperties}
    >
      <FaceRoundedIcon />
    </div>
  );

  return (
    <AvatarCached
      className={classnames('me-profile-avatar', !url && 'me-profile-avatar--empty')}
      size="extra-large"
      src={url}
      name={username}
      loader={<Loader />}
    >
      {!url && noAvatar}
      {
        editable
          ? (
            <div className="me-profile-avatar-edit" tabIndex={0} onClick={onEdit}>
              <EditRounded />
            </div>
          )
          : null
      }
    </AvatarCached>
  );
};

export default UserAvatar;
