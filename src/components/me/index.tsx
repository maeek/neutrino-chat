import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getMeAvatar, getMeBanner, getMeBio, getMeColor, getMeUsername } from '@/selectors/user';
import UserBanner from '@/components/common/user-components/banner';
import UserAvatar from '@/components/common/user-components/avatar';
import UserUsername from '@/components/common/user-components/username';
import UserBio from '@/components/common/user-components/bio';
import UserPageBackground from '@/components/common/user-components/page-background';
import ProfileQuickLinks from './quick-links';
import ProfileStatistics from './statistics';
import { ImageChange } from '../common/image-change';
import './me.scss';
import EditMeAvatarModal from './avatar-edit';
import EditMeBannerModal from './banner-edit';

export const ProfileView = () => {
  const username = useSelector(getMeUsername);
  const banner = useSelector(getMeBanner);
  const avatar = useSelector(getMeAvatar);
  const bio = useSelector(getMeBio);
  const color = useSelector(getMeColor);

  const [ isAvatarEdited, setIsAvatarEdited ] = useState(false);
  const [ isBannerEdited, setIsBannerEdited ] = useState(false);

  return (
    <div className="view-root view-root--me">
      <UserPageBackground url={banner} />
      <UserBanner editable url={banner} onEdit={() => setIsBannerEdited(true)} />
      <div className="me-profile-content">
        <UserAvatar
          url={avatar}
          username={username}
          color={color}
          editable
          onEdit={() => setIsAvatarEdited(true)}
        />
        <UserUsername username={username} />
        <UserBio text={bio} />
        <ProfileStatistics />
        <ProfileQuickLinks />
        <EditMeAvatarModal
          isEdited={isAvatarEdited}
          setEdited={(v: boolean) => setIsAvatarEdited(v)}
        />
        <EditMeBannerModal
          isEdited={isBannerEdited}
          setEdited={(v: boolean) => setIsBannerEdited(v)}
        />
      </div>
    </div>
  );
};

export default ProfileView;
