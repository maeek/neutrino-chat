import EditMeAvatarModal from '@/components/me/avatar-edit';
import { getMeAvatar } from '@/selectors/user';
import { InputRef } from '@maeek/neutrino-design/components/inputs/text/Input';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Heading } from '@maeek/neutrino-design';
import './avatar-setting.scss';

export const AvatarSetting = () => {
  const avatarUrl = useSelector(getMeAvatar);
  const [isEdited, setIsEdited] = useState(false);
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    inputRef?.current?.setValue(avatarUrl);
  }, [avatarUrl]);

  return (
    <div className='setting-avatar-preview-container'>
      <Heading level={4}>Avatar</Heading>
      <div className="centered">
      </div>
      <EditMeAvatarModal
        setEdited={(v: boolean) => setIsEdited(v)}
        isEdited={isEdited}
      />
    </div>
  );
};

export default AvatarSetting;
