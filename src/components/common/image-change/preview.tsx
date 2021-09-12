import { Avatar } from '@maeek/neutrino-design';
import Loader from '@maeek/neutrino-design/components/molecules/loaders/Loader';
import { DeleteRounded, PhotoRounded } from '@material-ui/icons';
import { MouseEvent } from 'react';
import './preview.scss';

export interface ImageChangePreviewProps {
  url?: string;
  onClear?: () => void;
}

export const ImageChangePreview = ({
  url,
  onClear
}: ImageChangePreviewProps) => {
  return (
    <Avatar
      src={url}
      size="extra-large"
      draggable={false}
      className="image-change-preview"
      loader={<Loader />}
      onContextMenu={(e: MouseEvent) => e.preventDefault()}
    >
      {
        !url
          ? (
            <div className="image-change-preview--empty">
              <PhotoRounded />
            </div>
          )
          : (
            <div className="image-change-preview--clear" onClick={onClear} tabIndex={0}>
              <DeleteRounded />
            </div>
          )
      }
    </Avatar>
  );
};
