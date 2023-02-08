import { memo, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { RootState } from '@/store/root';
import { Image } from '@maeek/neutrino-design/components/image/Image';
import { User } from '@/store/users/types';
import { getUserById } from '@/selectors/users';
import { SvgTextPattern } from './svg-pattern';
import './picture.scss';

export interface UserCardPictureProps {
  id: string;
}

export const UserCardPicture = memo(({ id }: UserCardPictureProps) => {
  const user = useSelector<RootState, User>(getUserById(id));
  const [isValidAvatar, setIsValidAvatar] = useState(true);
  const isReducedData = useMediaQuery({
    query: '(prefers-reduced-data: reduce)'
  });

  const noAvatarPlaceholer = useMemo(() => <SvgTextPattern text={id} />, [id]);

  const onLoad = useCallback(() => setIsValidAvatar(true), []);
  const onError = useCallback((e) => setIsValidAvatar(!user?.avatar || !e), []);

  return (
    <picture>
      <Image
        src={user?.avatar || ''}
        className={isValidAvatar || isReducedData ? '' : 'no-display'}
        loader={noAvatarPlaceholer}
        fallback={noAvatarPlaceholer}
        onLoad={onLoad}
        onError={onError}
      />
      {!isValidAvatar && noAvatarPlaceholer}
    </picture>
  );
});
