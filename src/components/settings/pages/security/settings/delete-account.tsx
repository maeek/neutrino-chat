import { getMeUsername } from '@/selectors/user';
import { useRef, useState, KeyboardEvent } from 'react';
import { useSelector } from 'react-redux';
import {
  AbortButton,
  Heading,
  useAccessibility,
  Text,
  Paragraph
} from '@maeek/neutrino-design';
import Input, {
  InputRef
} from '@maeek/neutrino-design/components/inputs/text/Input';
import './delete-account.scss';

export const DeleteAccountSetting = () => {
  const username = useSelector(getMeUsername);
  const [inProcess, setInProcess] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const { onEnter } = useAccessibility();
  const inputRef = useRef<InputRef>(null);

  const removeAccountStart = () => {
    if (!inProcess) {
      setInProcess(true);
      return;
    }

    if (confirmed) {
      setInProcess(false);
      alert('Remove account');
    }
  };

  const onCancelHandler = () => {
    setInProcess(false);
    setConfirmed(false);
  };

  return (
    <div className='setting-deletion-preview-container'>
      <Heading level={4}>Account Deletion</Heading>
      <Paragraph>
        You can delete your account here - this action is{' '}
        <Text underline type='danger'>
          irreversible
        </Text>
        . Once you click the button below, you will be asked for confirmation.
      </Paragraph>
      <div className='image-change-footer'>
        {inProcess && (
          <Input
            renderLabel={`Type '${username}' to confirm`}
            ref={inputRef}
            className='setting-deletion-preview'
            onChange={(e: string) => setConfirmed(e === username)}
            required
            validate={(e: string) => e === username}
          />
        )}
        {inProcess ? (
          <>
            <Text
              tabIndex={0}
              className='image-change-cancel'
              strong
              onClick={onCancelHandler}
              onKeyDown={onEnter(onCancelHandler)}
            >
              Cancel
            </Text>
            <AbortButton
              type='button'
              disabled={inProcess && !confirmed}
              onKeyDown={onEnter(removeAccountStart)}
              onClick={removeAccountStart}
              className='setting-deletion-button'
            >
              Confirm
            </AbortButton>
          </>
        ) : (
          <AbortButton
            type='button'
            disabled={inProcess && !confirmed}
            onKeyDown={onEnter(removeAccountStart)}
            onClick={removeAccountStart}
            className='setting-deletion-button'
          >
            Delete Account
          </AbortButton>
        )}
      </div>
    </div>
  );
};

export default DeleteAccountSetting;
