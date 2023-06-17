import { useDispatch, useSelector } from 'react-redux';
import { getMeAvatar, getMeUsername } from '@/selectors/user';
import { ImageChange } from '../common/image-change';
import { updateMeBasicInfo, uploadAvatar } from '@/actions/me';
import './avatar-edit.scss';

export interface EditMeAvatarModalProps {
  isEdited?: boolean;
  setEdited?: (v: boolean) => void;
}

export const EditMeAvatarModal = ({
  setEdited,
  isEdited
}: EditMeAvatarModalProps) => {
  const avatar = useSelector(getMeAvatar);
  const username = useSelector(getMeUsername);
  const dispatch = useDispatch();

  const savingHandler = async (file: File | null) => {
    if (!file) {
      await dispatch(updateMeBasicInfo(username, { avatar: '' }));
    } else {
      await dispatch(uploadAvatar(file));
    }
    setEdited?.(false);
  };

  return (
    <ImageChange
      url={avatar ? `/api/users/${username}/avatar` : undefined}
      title='Change Your profile picture'
      onCancel={() => setEdited?.(false)}
      isEdited={isEdited}
      setIsEdited={setEdited}
      onUpdate={savingHandler}
      forceAspectRatio='1-1'
    />
  );
};

export default EditMeAvatarModal;
