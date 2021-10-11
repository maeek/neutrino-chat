import { CSSProperties, MouseEventHandler, useState } from 'react';
import classnames from 'classnames';
import { AvatarCached } from '@maeek/neutrino-design/components/atoms/avatar';
import Loader from '@maeek/neutrino-design/components/molecules/loaders/Loader';
import EditRounded from '@material-ui/icons/EditRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import { Modal } from '@maeek/neutrino-design';
import './avatar.scss';
import { ImagePreview } from '../image-preview/image-preview';

export interface UserAvatarProps {
  url?: string;
  username?: string;
  color?: string;
  editable?: boolean;
  onEdit?: MouseEventHandler;
  expandOnClick?: boolean;
  className?: string;
}

export const UserAvatar = ({ url, username, color, editable, onEdit, expandOnClick, className }: UserAvatarProps) => {
  const [ isExpanded, setIsExpanded ] = useState(false);

  const onEditHandler: MouseEventHandler = e => {
    e.stopPropagation();
    onEdit?.(e);
  };

  const onClickHandler: MouseEventHandler = () => {
    if (expandOnClick && url) {
      setIsExpanded(true);
    }
  };

  const noAvatar = (
    <div
      className="user-profile-avatar-no-avatar"
      style={{ '--color': color } as CSSProperties}
    >
      <FaceRoundedIcon />
    </div>
  );

  return (
    <>
      <AvatarCached
        className={classnames('user-profile-avatar', !url && 'user-profile-avatar--empty', className)}
        size="extra-large"
        src={url}
        name={username}
        loader={<Loader />}
        onClick={onClickHandler}
      >
        {!url && noAvatar}
        {
          editable
            ? (
              <div className="user-profile-avatar-edit" tabIndex={0} onClick={onEditHandler}>
                <EditRounded />
              </div>
            )
            : null
        }
      </AvatarCached>
      
      {url && <ImagePreview url={url} isOpened={isExpanded} onClose={() => setIsExpanded(false)} />}
    </>
  );
};

export default UserAvatar;
