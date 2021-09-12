import { useDispatch, useSelector } from 'react-redux';
import { getMeAvatar } from '@/selectors/user';
import Modal from '@maeek/neutrino-design/components/atoms/modal/Modal';
import { ImageChange } from '../common/image-change';
import { setMeAvatar } from '@/store/me/user/actions';

export interface EditMeAvatarModalProps {
  isEdited?: boolean;
  setEdited?: (v: boolean) => void;
}

export const EditMeAvatarModal = ({ isEdited, setEdited }: EditMeAvatarModalProps) => {
  const avatar = useSelector(getMeAvatar);
  const dispatch = useDispatch();

  const savingHandler = (str: string) => {
    dispatch(setMeAvatar(str));
    setEdited?.(false);
  };

  return isEdited ? (
    <Modal mountPointId="modal-root">
      <ImageChange
        url={avatar}
        title="Change Your profile picture"
        onCancel={() => setEdited?.(false)}
        onUpdate={savingHandler}
      />
    </Modal>
  ) : null;
};

export default EditMeAvatarModal;
