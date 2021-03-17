import React, {
  FC,
  MouseEventHandler,
  MouseEvent,
  MutableRefObject,
  useRef,
  useState,
  useCallback
} from 'react';
import ProceedButton from '@maeek/neutrino-design/components/atoms/buttons/Proceed';
import { Input } from '@maeek/neutrino-design/components/atoms/inputs/text';
import { Heading } from '@maeek/neutrino-design/components/atoms/typography/heading';
import { Text } from '@maeek/neutrino-design/components/atoms/typography/text';
import { Paragraph } from '@maeek/neutrino-design/components/atoms/typography/paragraph';

import { User } from './types';
import './styles/form.scss';

interface RegisterFormProps {
  onHeadingClick?: MouseEventHandler;
  onRegister?: (user: User) => void;
  redirectToLogin?: Function;
}

export const RegisterForm: FC<RegisterFormProps> = (props) => {
  const {
    onRegister,
    redirectToLogin
  } = props;
  const loginRef = useRef<any>();
  const passwordRef = useRef<any>();
  const passwordRepeatRef = useRef<any>();

  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const clickOnFocus = (elementToFocus: MutableRefObject<any>) => () => {
    if (elementToFocus.current) elementToFocus.current.element.focus();
  };

  const onEnter = (action: Function) => (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action(e);
    }
  };

  const focusElement = (elementToFocus: MutableRefObject<any>) => () => {
    if (elementToFocus.current) elementToFocus.current.element.focus();
  };

  const validatePasswords = useCallback(
    (): boolean => password.length > 0 && password === passwordRepeat,
    [password, passwordRepeat]
  );

  const onRegisterHandler = (e: MouseEvent<any>) => {
    const username = loginRef.current.value;
    const password = passwordRef.current.value;

    if (validatePasswords && validatePasswords() && onRegister) {
      onRegister({
        username,
        password
      });
    } else {
      focusElement(passwordRef)();
    }
  };

  return (
    <div className="form-register">
      <Heading>Neutrino Chat</Heading>

      <div className="form-register-header">
        <Heading level={2}>Create Account</Heading>
        <Paragraph>Chat that does not save your messages! Share what's on your mind with anyone you want.</Paragraph>
      </div>

      <div className="form-register-box">
        <div className="form-register-box-entry">
          <Heading
            level={5}
            onClick={clickOnFocus(loginRef)}
            className="form-register-box-heading"
          >
            Username
          </Heading>
          <ul className="form-register-box-requirements" onClick={clickOnFocus(loginRef)}>
            <li>
              <Text type="secondary" className="form-register-box-requirements-entry form-register-box-requirements-entry--header">
                Username requirements:
              </Text>
            </li>
            <li>
              <Text type="secondary" className="form-register-box-requirements-entry">
                Minimum two (2) characters long
              </Text>
            </li>
            <li>
              <Text type="secondary" className="form-register-box-requirements-entry">
                Cannot contain {'“ #@”,’?!{}/\\~ ”'}
              </Text>
            </li>
          </ul>
          <Input
            ref={loginRef}
            className="form-register-box-input"
            type="text"
            name="username"
            autoComplete="username"
            placeholder="Username"
            required={true}
            onKeyUp={onEnter(focusElement(passwordRef))}
          />
        </div>

        <div className="form-register-box-entry">
          <Heading
            level={5}
            className="form-register-box-heading"
            onClick={clickOnFocus(passwordRef)}
          >
              Password
          </Heading>
          <ul className="form-register-box-requirements" onClick={clickOnFocus(passwordRef)}>
            <li>
              <Text type="secondary" className="form-register-box-requirements-entry form-register-box-requirements-entry--header">
                Password requirements:
              </Text>
            </li>
            <li>
              <Text type="secondary" className="form-register-box-requirements-entry">
                Minimum eight (8) characters long
              </Text>
            </li>
            <li>
              <Text type="secondary" className="form-register-box-requirements-entry">
                Contain at least one (1) number and one (1) special character
              </Text>
            </li>
          </ul>
          <Input
            ref={passwordRef}
            className="form-register-box-input"
            type="password"
            name="password"
            autoComplete="password"
            placeholder="Password"
            required={true}
            validate={validatePasswords}
            onChange={setPassword}
            onKeyUp={onEnter(focusElement(passwordRepeatRef))}
          />
        </div>
        <div className="form-register-box-entry">
          <Heading
            level={5}
            className="form-register-box-heading"
            onClick={clickOnFocus(passwordRepeatRef)}
          >
              Repeat Password
          </Heading>
          <Input
            ref={passwordRepeatRef}
            className="form-register-box-input"
            type="password"
            name="repeat-password"
            autoComplete="password"
            placeholder="Repeat Password"
            required={true}
            validate={validatePasswords}
            onChange={setPasswordRepeat}
            onKeyUp={onEnter(onRegisterHandler as Function)}
          />
        </div>
        <div className="form-register-box-entry">
          <Text type="secondary" className="form-register-box-appendix">
            Beware who you talk to on the Internet
          </Text>
        </div>
      </div>

      <ProceedButton className="button-login" onClick={onRegisterHandler}>Register</ProceedButton>

      <div className="form-register-footer">
        <Text>Already have an account?</Text>
        {' '}
        <Text link="/login" onClick={redirectToLogin}>Log in</Text>
      </div>
    </div>
  );
};
