import { memo, useCallback, KeyboardEvent } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import AvatarCached, { AvatarSizes } from '@maeek/neutrino-design/components/atoms/avatar/Avatar';
import { getMeAvatar, getMeUsername } from '@/selectors/user';
import Navigator from '@/utils/navigation';
import './styles/top-bar.scss';

export interface AvatarWrapperProps {
  src?: string;
  size?: AvatarSizes;
  [key: string]: any;
}

export const AvatarWrapper = (props: AvatarWrapperProps) => {
  const { src, size = 'medium', onClick } = props;
  const username = useSelector(getMeUsername);
  const avatar = useSelector(getMeAvatar);
  const history = useHistory();

  const goToProfile = () => Navigator.forward(history, '/me');
  const onEnter = useCallback((fn: Function) => (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter') {
      if(onClick) onClick();
      else fn();
    }
  }, [ onClick ]);

  return (
    <AvatarCached
      className="top-bar-avatar"
      selectable
      tabIndex={0}
      src={src || avatar}
      name={username}
      size={size}
      onClick={goToProfile}
      onKeyUp={onEnter(goToProfile)}
      {...props}
    />
  );
};

export default memo(AvatarWrapper);
