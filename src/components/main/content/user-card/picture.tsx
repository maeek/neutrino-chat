import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { RootState } from '@/store/root';
import ImageContainerCached from '@maeek/neutrino-design/components/atoms/image/Image';
import { User } from '@/store/users/types';
import { getUserById } from '@/selectors/users';
import { SvgTextPattern } from './svg-pattern';
import './picture.scss';

export interface UserCardPictureProps {
  id: string;
}

export const UserCardPicture = ({ id }: UserCardPictureProps) => {
  const user = useSelector<RootState, User>(getUserById(id));
  const [ isValidAvatar, setIsValidAvatar ] = useState(true);
  const isReducedData = useMediaQuery({ query: '(prefers-reduced-data: reduce)' });

  const noAvatarPlaceholer = useMemo(() => <SvgTextPattern text={id} />, [ id ]);

  return (
    <picture>
      <ImageContainerCached
        src={user?.avatar || ''}
        className={isValidAvatar || isReducedData ? '' : 'no-display'}
        loader={noAvatarPlaceholer}
        onImageLoaded={(e) => setIsValidAvatar(!e)}
      />
      {!isValidAvatar && noAvatarPlaceholer}  
    </picture>
  );
};
