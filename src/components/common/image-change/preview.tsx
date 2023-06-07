import { Avatar } from '@maeek/neutrino-design/components/avatar/Avatar';
import Loader from '@maeek/neutrino-design/components/loaders/Loader';
import { DeleteRounded, PhotoCameraRounded } from '@material-ui/icons';
import { MouseEvent } from 'react';
import './preview.scss';

export interface ImageChangePreviewProps {
  url?: string;
  onClear?: () => void;
  forceAspectRatio?: '1-1';
}

export const ImageChangePreview = ({
  url,
  onClear,
  forceAspectRatio
}: ImageChangePreviewProps) => {
  return (
    <Avatar
      key={url}
      src={url}
      size='extra-large'
      draggable={false}
      className={`image-change-preview ${
        forceAspectRatio ? `image-change-preview--${forceAspectRatio}` : ''
      }`}
      loader={<Loader />}
      onContextMenu={(e: MouseEvent) => e.preventDefault()}
    >
      {!url ? (
        <div className='image-change-preview--empty'>
          <PhotoCameraRounded />
        </div>
      ) : (
        <>
          <div
            className='image-change-preview-clear'
            onClick={onClear}
            tabIndex={0}
          >
            <DeleteRounded />
          </div>
        </>
      )}
    </Avatar>
  );
};
