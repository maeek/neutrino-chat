import {
  memo,
  useCallback,
  KeyboardEvent,
  CSSProperties,
  MouseEventHandler,
  MouseEvent
} from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import classnames from 'classnames';
import Avatar, {
  AvatarSizes
} from '@maeek/neutrino-design/components/avatar/Avatar';
import Loader from '@maeek/neutrino-design/components/loaders/Loader';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import { getMeAvatar, getMeColor, getMeUsername } from '@/selectors/user';
import Navigator from '@/utils/navigation';
import './avatar-wrapper.scss';

export interface AvatarWrapperProps {
  src?: string;
  size?: AvatarSizes;
  onClick?: MouseEventHandler;
  redirect?: boolean;
}

export const AvatarWrapper = (props: AvatarWrapperProps) => {
  const { src, size = 'medium', onClick, redirect } = props;
  const username = useSelector(getMeUsername);
  const meColor = useSelector(getMeColor);
  const avatar = useSelector(getMeAvatar);
  const history = useHistory();
  const hasAvatar = src || avatar;

  const goToProfile: MouseEventHandler = useCallback((e) => {
    onClick?.(e);

    if (redirect) Navigator.forward(history, '/me');
  }, [onClick, redirect, history]);

  const onEnter = useCallback(
    (fn: Function) => (e: KeyboardEvent<HTMLSpanElement>) => {
      if (e.key === 'Enter') {
        if (onClick) onClick(e as unknown as MouseEvent);
        else fn();
      }
    },
    [onClick]
  );

  const noAvatar = (
    <div
      className='top-bar-avatar-no-avatar'
      style={{ '--color': meColor } as CSSProperties}
    >
      <FaceRoundedIcon />
    </div>
  );

  return (
    <Avatar
      // {...rest}
      className={classnames(
        'top-bar-avatar',
        !hasAvatar && 'top-bar-avatar--empty'
      )}
      selectable
      tabIndex={0}
      src={src || avatar}
      name={username}
      size={size}
      onClick={goToProfile}
      onKeyUp={onEnter(goToProfile)}
      loader={<Loader />}
    >
      {!hasAvatar ? noAvatar : null}
    </Avatar>
  );
};

export default memo(AvatarWrapper);
