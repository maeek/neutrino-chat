import { CSSProperties, MouseEventHandler, ReactNode, useState } from 'react';
import classnames from 'classnames';
import EditRounded from '@material-ui/icons/EditRounded';
import { Avatar as AvatarCached } from '@maeek/neutrino-design/components/avatar';
import { AvatarSizes } from '@maeek/neutrino-design/components/avatar/Avatar';
import Loader from '@maeek/neutrino-design/components/loaders/Loader';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import { ImagePreview } from '../image-preview/image-preview';
import { UserStatusEnum } from '@/store/users/types';
import { StatusDot, StatusDotState } from '../status-dot';
import './avatar.scss';

export interface UserAvatarProps {
  url?: string;
  username?: string;
  color?: string;
  editable?: boolean;
  onEdit?: MouseEventHandler;
  expandOnClick?: boolean;
  className?: string;
  size?: AvatarSizes;
  status?: UserStatusEnum;
  loader?: ReactNode;
}

export const UserAvatar = ({
  url,
  username,
  color,
  editable,
  onEdit,
  expandOnClick,
  className,
  status,
  loader = <Loader />,
  size = 'extra-large'
}: UserAvatarProps) => {
  const [ isExpanded, setIsExpanded ] = useState(false);

  const getStatus = () => {
    switch (status) {
    case UserStatusEnum.ACTIVE:
      return 'Online';
    case UserStatusEnum.AWAY:
      return 'Away';
    case UserStatusEnum.OFFLINE:
      return 'Offline';
    default:
      return 'Unknown';
    }
  };

  const mapStatusToDotStatus = (
    status: 'Online' | 'Offline' | 'Away' | 'Unknown'
  ) => status.toLowerCase() as StatusDotState;

  const onEditHandler: MouseEventHandler = (e) => {
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
      className='user-profile-avatar-no-avatar'
      style={{ '--color': color } as CSSProperties}
    >
      <FaceRoundedIcon />
    </div>
  );

  const statusNode = status ? (
    <StatusDot
      state={mapStatusToDotStatus(getStatus())}
      className='user-profile-avatar-status'
    />
  ) : null;

  return (
    <>
      <div className='user-profile-avatar-container'>
        <AvatarCached
          className={classnames(
            'user-profile-avatar',
            !url && 'user-profile-avatar--empty',
            className
          )}
          size={size}
          src={url}
          name={username}
          loader={loader}
          onClick={onClickHandler}
        >
          {!url && noAvatar}
          {editable ? (
            <div
              className='user-profile-avatar-edit'
              tabIndex={0}
              onClick={onEditHandler}
            >
              <EditRounded />
            </div>
          ) : null}
        </AvatarCached>
        {statusNode}
      </div>

      {url && (
        <ImagePreview
          url={url}
          isOpened={isExpanded}
          onClose={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default UserAvatar;
