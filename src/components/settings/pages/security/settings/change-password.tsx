import { useRef, useState } from 'react';
import {
  ProceedButton,
  Heading,
  Text,
  Paragraph,
  useAccessibility
} from '@maeek/neutrino-design';
import Input, {
  InputRef
} from '@maeek/neutrino-design/components/inputs/text/Input';
import './change-password.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getMeUsername } from '@/selectors/user';
import { updateMeBasicInfo } from '@/actions/me';

export const ChangePasswordSetting = () => {
  const dispath = useDispatch();
  const username = useSelector(getMeUsername);
  const prevInputRef = useRef<InputRef>(null);
  const newInputRef = useRef<InputRef>(null);
  const [ prevPassword, setPrevPassword ] = useState('');
  const [ newPassword, setNewPassword ] = useState('');
  const { onEnter } = useAccessibility();

  const onChangePassword = async () => {
    if (prevPassword.length > 0 && newPassword.length > 0) {
      await dispath(
        updateMeBasicInfo(username, {
          currentPassword: prevPassword,
          password: newPassword
        })
      );
      onCancelHandler();
      return;
    }
  };

  const onCancelHandler = () => {
    setPrevPassword('');
    setNewPassword('');
    prevInputRef.current?.setValue('');
    newInputRef.current?.setValue('');
  };

  return (
    <div className='setting-password-preview-container'>
      <Heading level={4}>Change Password</Heading>
      <Paragraph>
        You can change your password here. Please enter your current password
        and then your new password.
      </Paragraph>
      <div className='setting-password-preview-inputs'>
        <Input
          type='password'
          ref={prevInputRef}
          renderLabel='Current password'
          className='setting-password-preview'
          onChange={(e: string) => setPrevPassword(e)}
          value={prevPassword}
        />
        <Input
          type='password'
          ref={newInputRef}
          renderLabel='New password'
          className='setting-password-preview'
          onChange={(e: string) => setNewPassword(e)}
          value={newPassword}
        />
      </div>
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
          disabled={!prevPassword.length || !newPassword.length}
          type='button'
          className='setting-password-button'
          onClick={onChangePassword}
          onKeyUp={onEnter(onChangePassword)}
        >
          Change
        </ProceedButton>
      </div>
    </div>
  );
};

export default ChangePasswordSetting;
