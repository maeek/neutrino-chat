import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { ImageChangePreview } from './preview';
import { ImageChangeFooter } from './footer';
import { FileSelect } from '@maeek/neutrino-design/components/inputs/file/FileSelect';
import './image-change.scss';

export interface GalleryItem {
  url: string;
}

export interface ImageChangeProps {
  url?: string;
  isEdited?: boolean;
  setIsEdited?: (v: boolean) => void;
  forceAspectRatio?: '1-1';
  onUpdate?: (file: File | null) => Promise<string | undefined | void>;
  onCancel?: () => void;
}

export const ImageChange = ({
  url,
  onUpdate,
  onCancel,
  isEdited,
  setIsEdited,
  forceAspectRatio
}: ImageChangeProps) => {
  const [originalImg, setOriginalImg] = useState(url);
  const [currentImgFile, setCurrentImgFile] = useState<File>();
  const [currentImg, setCurrentImg] = useState(url || '');
  const ref = useRef<{ clear: () => void }>(null);

  const savingIsBlocked = !isEdited;

  const onUpdateHandler = () => {
    if (onUpdate && !savingIsBlocked) {
      onUpdate(currentImgFile || null);
      ref.current?.clear();
    }

    return currentImg;
  };

  const onCancelHandler = () => {
    if (onCancel) {
      onCancel();
    }

    setCurrentImg(url || '');
    ref.current?.clear();
  };

  const onClearAvatar = () => {
    setCurrentImg('');
    setCurrentImgFile(undefined);
    ref.current?.clear();
    setIsEdited?.(true);
  };

  const fileSelect = useCallback((files: FileList | null) => {
    if (files?.[0]) {
      setCurrentImgFile(files[0]);
      setCurrentImg(URL.createObjectURL(files[0]));
      setIsEdited?.(true);
    }
  }, []);

  useEffect(() => {
    if (url !== originalImg) {
      setOriginalImg(url);
    }

    return () => {
      if (url && url !== originalImg) {
        URL.revokeObjectURL(url);
      }
    };
  }, [url, originalImg]);

  return (
    <section className='image-change-wrapper'>
      <div className='image-change-container'>
        <div className='image-change-content'>
          <ImageChangePreview
            url={currentImg}
            onClear={onClearAvatar}
            forceAspectRatio={forceAspectRatio}
          />
          <FileSelect
            ref={ref}
            description='Upload your profile photo'
            onChange={fileSelect}
            accept='image/*'
            limit={1}
            buttonText='Select a photo'
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
