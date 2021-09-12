import { useDispatch, useSelector } from 'react-redux';
import { getMeBanner } from '@/selectors/user';
import Modal from '@maeek/neutrino-design/components/atoms/modal/Modal';
import { ImageChange } from '../common/image-change';
import { setMeBanner } from '@/store/me/user/actions';

export interface EditMeBannerModalProps {
  isEdited?: boolean;
  setEdited?: (v: boolean) => void;
}

export const EditMeBannerModal = ({ isEdited, setEdited }: EditMeBannerModalProps) => {
  const banner = useSelector(getMeBanner);
  const dispatch = useDispatch();

  const savingHandler = (str: string) => {
    dispatch(setMeBanner(str));
    setEdited?.(false);
  };

  return isEdited ? (
    <Modal mountPointId="modal-root">
      <ImageChange
        url={banner}
        title="Change Your banner picture"
        onCancel={() => setEdited?.(false)}
        onUpdate={savingHandler}
      />
    </Modal>
  ) : null;
};

export default EditMeBannerModal;
