import { memo, useCallback, KeyboardEvent, CSSProperties } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import classnames from 'classnames';
import AvatarCached, { AvatarSizes } from '@maeek/neutrino-design/components/atoms/avatar/Avatar';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import { getMeAvatar, getMeColor, getMeUsername } from '@/selectors/user';
import Navigator from '@/utils/navigation';
import './avatar-wrapper.scss';

export interface AvatarWrapperProps {
  src?: string;
  size?: AvatarSizes;
  [key: string]: any;
}

export const AvatarWrapper = (props: AvatarWrapperProps) => {
  const { src, size = 'medium', onClick } = props;
  const username = useSelector(getMeUsername);
  const meColor = useSelector(getMeColor);
  const avatar = useSelector(getMeAvatar);
  const history = useHistory();
  const hasAvatar = src || avatar;

  const goToProfile = () => Navigator.forward(history, '/me');
  const onEnter = useCallback((fn: Function) => (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter') {
      if(onClick) onClick();
      else fn();
    }
  }, [ onClick ]);

  const noAvatar = (
    <div
      className="top-bar-avatar-no-avatar"
      style={{ '--color': meColor } as CSSProperties}
    >
      <FaceRoundedIcon />
    </div>
  );

  return (
    <AvatarCached
      className={classnames('top-bar-avatar', !hasAvatar && 'top-bar-avatar--empty')}
      selectable
      tabIndex={0}
      src={src || avatar}
      name={username}
      size={size}
      onClick={goToProfile}
      onKeyUp={onEnter(goToProfile)}
      {...props}
    >
      {!hasAvatar ? noAvatar : null}
    </AvatarCached>
  );
};

export default memo(AvatarWrapper);
