import { useDispatch, useSelector } from 'react-redux';
import { getMeAvatar } from '@/selectors/user';
import { ImageChange } from '../common/image-change';
import { setMeAvatar } from '@/store/me/user/actions';
import './avatar-edit.scss';

export interface EditMeAvatarModalProps {
  isEdited?: boolean;
  setEdited?: (v: boolean) => void;
}

export const EditMeAvatarModal = ({
  setEdited
}: EditMeAvatarModalProps) => {
  const avatar = useSelector(getMeAvatar);
  const dispatch = useDispatch();

  const savingHandler = (str: string) => {
    dispatch(setMeAvatar(str));
    setEdited?.(false);
  };

  return (
    <ImageChange
      url={avatar}
      title='Change Your profile picture'
      onCancel={() => setEdited?.(false)}
      onUpdate={savingHandler}
      forceAspectRatio='1-1'
    />
  );
};

export default EditMeAvatarModal;
