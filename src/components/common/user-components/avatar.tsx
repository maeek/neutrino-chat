import { CSSProperties, MouseEventHandler, useState } from 'react';
import classnames from 'classnames';
import { AvatarCached } from '@maeek/neutrino-design/components/atoms/avatar';
import Loader from '@maeek/neutrino-design/components/molecules/loaders/Loader';
import EditRounded from '@material-ui/icons/EditRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import { Modal } from '@maeek/neutrino-design';
import './avatar.scss';

export interface UserAvatarProps {
  url?: string;
  username?: string;
  color?: string;
  editable?: boolean;
  onEdit?: MouseEventHandler;
  expandOnClick?: boolean;
}

export const UserAvatar = ({ url, username, color, editable, onEdit, expandOnClick }: UserAvatarProps) => {
  const [ isExpanded, setIsExpanded ] = useState(false);

  const onEditHandler: MouseEventHandler = e => {
    e.stopPropagation();
    onEdit?.(e);
  };

  const onClickHandler: MouseEventHandler = () => {
    if (expandOnClick && url) {
      console.log('SHOULD EXPAND');
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
        className={classnames('user-profile-avatar', !url && 'user-profile-avatar--empty')}
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
      
      <Modal
        mountPointId="modal-root"
        className="modal-fullpage-image-preview"
      >
        <div
          className={classnames(
            'modal-fullpage-image-preview-mask',
            isExpanded && 'modal-fullpage-image-preview-mask--visible'
          )}
          onClick={() => setIsExpanded(false)}
        >
          <AvatarCached
            className="user-profile-avatar"
            size="extra-large"
            type="rounded"
            src={url}
            name={username}
          />
        </div>
      </Modal>
    </>
  );
};

export default UserAvatar;
