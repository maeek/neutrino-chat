import { useDispatch, useSelector } from 'react-redux';
import { getMeBanner } from '@/selectors/user';
import Modal from '@maeek/neutrino-design/components/atoms/modal/Modal';
import { ImageChange } from '../common/image-change';
import { setMeBanner } from '@/store/me/user/actions';
import './banner-edit.scss';

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

  return (
    <Modal mountPointId="modal-root" className={`modal-fullpage ${isEdited ? 'modal-visible' : ''}`}>
      <ImageChange
        url={banner}
        title="Change Your banner picture"
        onCancel={() => setEdited?.(false)}
        onUpdate={savingHandler}
      />
    </Modal>
  );
};

export default EditMeBannerModal;
