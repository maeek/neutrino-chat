import { FC, memo, useCallback, KeyboardEvent } from 'react';
import { useSelector } from 'react-redux';
import { AvatarCached } from '@maeek/neutrino-design/components/atoms/avatar';
import { AvatarSizes } from '@maeek/neutrino-design/components/atoms/avatar/avatar';
import { getMeAvatar, getMeUsername } from '../../../store/me/user/selectors';
import Navigator from '../../../utils/navigation';
import { useHistory } from 'react-router';
import './styles/top-bar.scss';

export interface AvatarWrapperProps {
  src?: string;
  size?: AvatarSizes;
  onClick?: any;
  [key: string]: any;
}

export const AvatarWrapper: FC<AvatarWrapperProps> = (props) => {
  const { src, size = 'medium', onClick } = props;
  const username = useSelector(getMeUsername);
  const avatar = useSelector(getMeAvatar);
  const history = useHistory();

  const goToProfile = () => Navigator.forward(history, '/profile');
  const onEnter = useCallback((fn: Function) => (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter') {
      fn();
    }
  }, []);

  return (
    <AvatarCached
      className="top-bar-avatar"
      selectable
      tabIndex={0}
      src={src || avatar}
      name={username}
      size={size}
      onClick={goToProfile}
      onKeyUp={onEnter(onClick)}
      {...props}
    />
  );
};

export default memo(AvatarWrapper);
