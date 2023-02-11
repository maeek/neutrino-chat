import { Modal } from '@maeek/neutrino-design/components/modal/Modal';
import { BackgroundImage } from '@/components/common/background-image/background-image';
import classnames from 'classnames';
import './image-preview.scss';

export interface ImagePreviewProps {
  url: string;
  isOpened?: boolean;
  onClose?: () => void;
}

export const ImagePreview = ({ url, isOpened, onClose }: ImagePreviewProps) => {
  return (
    <Modal mountPointId='modal-root' className='modal-fullpage-image-preview'>
      <div
        className={classnames(
          'modal-fullpage-image-preview-mask',
          isOpened && 'modal-fullpage-image-preview-mask--visible'
        )}
        onClick={onClose}
      >
        <BackgroundImage opacity={1} blur='0' url={url} objectFit='contain' />
      </div>
    </Modal>
  );
};
