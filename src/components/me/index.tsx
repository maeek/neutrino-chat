import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getMeAvatar,
  getMeBio,
  getMeColor,
  getMeUsername
} from '@/selectors/user';
import UserAvatar from '@/components/common/user-components/avatar';
import UserUsername from '@/components/common/user-components/username';
import UserBio from '@/components/common/user-components/bio';
import ProfileQuickLinks from './quick-links';
import EditMeAvatarModal from './avatar-edit';
import EditMeBannerModal from './banner-edit';
import { MessageTypes } from '@/store/messages/types';
import { ComposeMessage } from '../common/chat/compose';
import { useHistory } from 'react-router-dom';
import Navigator from '@/utils/navigation';
import './me.scss';

export const ProfileView = () => {
  const history = useHistory();
  const username = useSelector(getMeUsername);
  const avatar = useSelector(getMeAvatar);
  const bio = useSelector(getMeBio);
  const color = useSelector(getMeColor);

  const navigate = () => {
    Navigator.forward(history, `/u/${username}/chat`);
  };

  const [isAvatarEdited, setIsAvatarEdited] = useState(false);
  const [isBannerEdited, setIsBannerEdited] = useState(false);

  return (
    <div className='view-root view-root--me'>
      <div className='me-profile-content'>
        <UserAvatar
          url={avatar}
          username={username}
          color={color}
          editable
          onEdit={() => setIsAvatarEdited(true)}
        />
        <UserUsername username={username} />
        <UserBio text={bio} />
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
