import { MouseEventHandler, ReactNode } from 'react';
import { Heading } from '@maeek/neutrino-design/components/typography/heading/Heading';
import { Paragraph } from '@maeek/neutrino-design/components/typography/paragraph/Paragraph';
import CloseRounded from '@material-ui/icons/CloseRounded';
import './header.scss';

export interface ImageChangeHeaderProps {
  /**
   * Modal title
   */
  title?: string | ReactNode;
  /**
   * Modal description
   */
  description?: string | ReactNode;
  onClose?: () => void;
  compact?: boolean;
}

export const ImageChangeHeader = ({
  title = 'Change image',
  description = 'You can drop files into the preview or paste URL in the input.',
  onClose,
  compact
}: ImageChangeHeaderProps) => {
  const onCloseHandler: MouseEventHandler = (e) => {
    e.preventDefault();

    if (onClose) onClose();
  };

  return (
    <>
      <div className='image-change-header-plank'>
        <CloseRounded
          onClick={onCloseHandler}
          tabIndex={0}
          className='image-change-close'
        />
      </div>
      <header
        className={`image-change-header ${
          compact ? 'image-change-header--compact' : ''
        }`}
      >
        <Heading className='image-change-header-heading'>{title}</Heading>
        <Paragraph className='image-change-header-desc'>
          {description}
        </Paragraph>
      </header>
    </>
  );
};
