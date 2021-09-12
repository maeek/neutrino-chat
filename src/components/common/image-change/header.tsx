import { Heading, Paragraph } from '@maeek/neutrino-design';
import CloseRounded from '@material-ui/icons/CloseRounded';
import { MouseEventHandler, ReactNode } from 'react';
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
}

export const ImageChangeHeader = ({
  title = 'Change image',
  description = 'You can drop files into the preview or paste URL in the input.',
  onClose
}: ImageChangeHeaderProps) => {

  const onCloseHandler: MouseEventHandler = (e) => {
    e.preventDefault();

    if (onClose) onClose();
  };

  return (
    <header className="image-change-header">
      <Heading className="image-change-header-heading">{title}</Heading>
      <Paragraph>{description}</Paragraph>
      <CloseRounded
        onClick={onCloseHandler}
        tabIndex={0}
        className="image-change-close"
      />
    </header>
  );
};
