import {
  MutableRefObject,
  useRef,
  useState,
  useCallback,
  useMemo
} from 'react';
import { Input } from '@maeek/neutrino-design/components/inputs/text';
import ProceedButton from '@maeek/neutrino-design/components/buttons/Proceed';
import { Heading } from '@maeek/neutrino-design/components/typography/heading';
import { Text } from '@maeek/neutrino-design/components/typography/text';
import { User } from '../types';
import { RegisterFormHeader } from './header';
import { useLocation } from 'react-router-dom';
import { browserSupportsWebAuthn } from '@simplewebauthn/browser';
import './box.scss';

interface RegisterFormBoxProps {
  onRegister?: (user: User) => void;
}

export const RegisterFormBox = ({ onRegister }: RegisterFormBoxProps) => {
  const { search } = useLocation<{ method: string }>();
  const method = useMemo(
    () => new URLSearchParams(search)?.get('method') || '',
    [search]
  );
  const doesNotSupportWebAuthn = useMemo(() => browserSupportsWebAuthn(), []);
  const loginRef = useRef<any>();
  const passwordRef = useRef<any>();
  const passwordRepeatRef = useRef<any>();

  const [username, setUsername] = useState('');
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

  const validateUsername = useCallback(
    (): boolean => !/[#@",?!{}/\\~*()]/.test(username) && username.length > 2,
    [username]
  );

  const onRegisterHandler = () => {
    const username = loginRef.current.value;
    const password = passwordRef.current?.value;

    if ((method === 'webauthn' || validatePasswords()) && onRegister) {
      onRegister({
        username,
        password,
        method: (method as 'webauthn' | 'password') || 'password'
      });
    } else {
      focusElement(passwordRef)();
    }
  };

  return (
    <>
      <div className='form-register-box'>
        <RegisterFormHeader />
        <div className='form-register-box-entry'>
          <Heading
            level={5}
            onClick={clickOnFocus(loginRef)}
            className='form-register-box-heading'
          >
            Username
          </Heading>
          <ul
            className='form-register-box-requirements'
            onClick={clickOnFocus(loginRef)}
          >
            <li>
              <Text
                type='secondary'
                className='form-register-box-requirements-entry form-register-box-requirements-entry--header'
              >
                Username requirements:
              </Text>
            </li>
            <li>
              <Text
                type='secondary'
                className='form-register-box-requirements-entry'
              >
                Minimum two (2) characters long
              </Text>
            </li>
            <li>
              <Text
                type='secondary'
                className='form-register-box-requirements-entry'
              >
                Cannot contain {'“ #@”,’?!{}/\\~ *()”'}
              </Text>
            </li>
          </ul>
          <Input
            ref={loginRef}
            className='form-register-box-input'
            type='text'
            name='username'
            autoComplete='username'
            placeholder='Username'
            required={true}
            onKeyUp={onEnter(focusElement(passwordRef))}
            validate={validateUsername}
            onChange={setUsername}
          />
        </div>

        {!method ? (
          <>
            <div className='form-register-box-entry'>
              <Heading
                level={5}
                className='form-register-box-heading'
                onClick={clickOnFocus(passwordRef)}
              >
                Password
              </Heading>
              <ul
                className='form-register-box-requirements'
                onClick={clickOnFocus(passwordRef)}
              >
                <li>
                  <Text
                    type='secondary'
                    className='form-register-box-requirements-entry form-register-box-requirements-entry--header'
                  >
                    Password requirements:
                  </Text>
                </li>
                <li>
                  <Text
                    type='secondary'
                    className='form-register-box-requirements-entry'
                  >
                    Minimum eight (8) characters long
                  </Text>
                </li>
                <li>
                  <Text
                    type='secondary'
                    className='form-register-box-requirements-entry'
                  >
                    Contain at least one (1) number and one (1) special
                    character
                  </Text>
                </li>
              </ul>
              <Input
                ref={passwordRef}
                className='form-register-box-input'
                type='password'
                name='password'
                autoComplete='password'
                placeholder='Password'
                required={true}
                validate={validatePasswords}
                onChange={setPassword}
                onKeyUp={onEnter(focusElement(passwordRepeatRef))}
              />
            </div>
            <div className='form-register-box-entry'>
              <Heading
                level={5}
                className='form-register-box-heading'
                onClick={clickOnFocus(passwordRepeatRef)}
              >
                Repeat Password
              </Heading>
              <Input
                ref={passwordRepeatRef}
                className='form-register-box-input'
                type='password'
                name='repeat-password'
                autoComplete='password'
                placeholder='Repeat Password'
                required={true}
                validate={validatePasswords}
                onChange={setPasswordRepeat}
                onKeyUp={onEnter(onRegisterHandler as Function)}
              />
            </div>
          </>
        ) : (
          <div className='form-register-box-entry'>
            <Text type='secondary' className='form-register-box-appendix'>
              You don't need to set a password, you can use Web Authentication
              technology instead.
            </Text>
          </div>
        )}
      </div>
      <ProceedButton
        type='button'
        className='button-login'
        onClick={onRegisterHandler}
        disabled={
          !validateUsername() ||
          (!doesNotSupportWebAuthn && !validatePasswords())
        }
      >
        Register
      </ProceedButton>
    </>
  );
};
