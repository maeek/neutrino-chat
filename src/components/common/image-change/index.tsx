import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { ImageChangePreview } from './preview';
import { ImageChangeFooter } from './footer';
import { FileSelect } from '@maeek/neutrino-design/components/inputs/file/FileSelect';
import './image-change.scss';

export interface GalleryItem {
  url: string;
}

export interface ImageChangeProps {
  /**
   * Modal title
   */
  title?: string | ReactNode;
  /**
   * Modal description
   */
  description?: string | ReactNode;
  /**
   * Current image url
   */
  url?: string;
  /**
   * Can the image be removed entirely
   */
  canBeRemoved?: boolean;
  forceAspectRatio?: '1-1';
  mimeTypesAllowed?: 'image/*' | string[];
  gallery?: GalleryItem[];
  onUpdate?: (image: string) => string | undefined | void;
  onCancel?: () => void;
}

const SCROLL_POINT = 50;

export const ImageChange = ({
  url,
  onUpdate,
  onCancel,
  forceAspectRatio
}: ImageChangeProps) => {
  const [originalImg, setOriginalImg] = useState(url);
  const [currentImg, setCurrentImg] = useState(url || '');
  const savingIsBlocked = currentImg === originalImg;
  const ref = useRef<{ clear: () => void }>(null);

  const onUpdateHandler = () => {
    if (onUpdate && !savingIsBlocked) {
      onUpdate(currentImg);
      ref.current?.clear();
    }

    return currentImg;
  };

  const onCancelHandler = () => {
    if (onCancel) {
      onCancel();
    }

    setCurrentImg(url || '');
  };

  const fileSelect = useCallback((files: FileList | null) => {
    if (files?.[0]) {
      setCurrentImg(URL.createObjectURL(files[0]));
    }
  }, []);

  useEffect(() => {
    if (url !== originalImg) {
      setOriginalImg(url);
    }
  }, [url, originalImg]);

  return (
    <section className='image-change-wrapper'>
      <div className='image-change-container'>
        <div className='image-change-content'>
          <ImageChangePreview
            url={currentImg}
            onClear={() => setCurrentImg('')}
            forceAspectRatio={forceAspectRatio}
          />
          <FileSelect
            ref={ref}
            description='Upload your profile photo'
            onChange={fileSelect}
            accept='image/*'
            limit={1}
            buttonText='Upload a photo'
          />
        </div>
        <ImageChangeFooter
          isUpdateButtonDisabled={savingIsBlocked}
          onCancel={onCancelHandler}
          onUpdate={onUpdateHandler}
        />
      </div>
    </section>
  );
};
