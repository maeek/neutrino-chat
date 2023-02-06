import { ProceedButton } from '@maeek/neutrino-design/components/buttons/Proceed';
import { Text } from '@maeek/neutrino-design/components/typography/text/Text';
import { MouseEventHandler } from 'react';
import './footer.scss';

export interface ImageChangeFooterProps {
  onUpdate?: () => void;
  isUpdateButtonDisabled?: boolean;
  onCancel?: () => void;
}

export const ImageChangeFooter = ({
  onCancel,
  onUpdate,
  isUpdateButtonDisabled
}: ImageChangeFooterProps) => {
  const onCancelHandler: MouseEventHandler = (e) => {
    e.preventDefault();

    if (onCancel) onCancel();
  };

  return (
    <div className='image-change-footer'>
      <Text
        tabIndex={0}
        className='image-change-cancel'
        strong
        onClick={onCancelHandler}
      >
        Cancel
      </Text>
      <ProceedButton
        disabled={isUpdateButtonDisabled}
        type='button'
        onClick={onUpdate}
      >
        Update
      </ProceedButton>
    </div>
  );
};
