import UserAvatar from '@/components/common/user-components/avatar';
import EditMeAvatarModal from '@/components/me/avatar-edit';
import { getMeAvatar, getMeUsername } from '@/selectors/user';
import { InputRef } from '@maeek/neutrino-design/components/inputs/text/Input';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import './avatar-setting.scss';

export const AvatarSetting = () => {
  const avatarUrl = useSelector(getMeAvatar);
  const username = useSelector(getMeUsername);
  const [isEdited, setIsEdited] = useState(false);
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    inputRef?.current?.setValue(avatarUrl);
  }, [avatarUrl]);

  return (
    <div className='setting-avatar-preview-container'>
      <UserAvatar
        className='setting-avatar-preview'
        editable
        username={username}
        url={avatarUrl}
        onEdit={() => setIsEdited(true)}
      />
      <EditMeAvatarModal
        setEdited={(v: boolean) => setIsEdited(v)}
        isEdited={isEdited}
      />
    </div>
  );
};

export default AvatarSetting;
