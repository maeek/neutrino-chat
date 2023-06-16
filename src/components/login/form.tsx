import {
  MouseEvent,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef
} from 'react';
import ProceedButton from '@maeek/neutrino-design/components/buttons/Proceed';
import { Input } from '@maeek/neutrino-design/components/inputs/text';
import { Heading } from '@maeek/neutrino-design/components/typography/heading';
import { Paragraph } from '@maeek/neutrino-design/components/typography/paragraph';
import { Text } from '@maeek/neutrino-design/components/typography/text';
import Navigator from '@/utils/navigation';
import { useHistory, useLocation } from 'react-router-dom';
import './form.scss';

interface LoginFormProps {
  onLogin?: (username: string, password: string, webAuthn?: boolean) => void;
}

export const LoginForm = (props: LoginFormProps) => {
  const { onLogin } = props;
  const history = useHistory();
  const { search } = useLocation<{ method: string }>();
  const method = useMemo(
    () => new URLSearchParams(search)?.get('method') || '',
    [search]
  );
  const doesNotSupportWebAuthn = useMemo(
    () => typeof PublicKeyCredential == 'undefined',
    []
  );
  const savedUsername = useMemo(
    () => localStorage.getItem('savedUsername'),
    []
  );
  const loginRef = useRef<any>();
  const passwordRef = useRef<any>();

  const clickOnFocus = (elementToFocus: MutableRefObject<any>) => () => {
    if (elementToFocus.current) elementToFocus.current.element.focus();
  };

  const onEnter = (action: Function) => (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action(e);
    }
  };

  const redirectToWebAuthn = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    Navigator.replace(history, '/login', {}, '?method=webauthn');
  };

  const redirectToPassword = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    Navigator.replace(history, '/login');
  };

  const focusNextOnEnter = (elementToFocus: MutableRefObject<any>) => () => {
    if (elementToFocus.current) elementToFocus.current.element.focus();
  };

  const onLoginHandler = () => {
    if (!loginRef.current.value) {
      loginRef.current.element.focus();
      return;
    }

    const username = loginRef.current.value;
    const password = passwordRef.current?.value;

    if (onLogin && method === 'webauthn') onLogin(username, '', true);
    else if (onLogin) onLogin(username, password);
  };

  useEffect(() => {
    if (doesNotSupportWebAuthn) {
      Navigator.replace(history, '/login');
    }
  }, [doesNotSupportWebAuthn, history]);

  useEffect(() => {
    if (savedUsername) {
      loginRef.current?.setValue(savedUsername);
    }
  }, [savedUsername, method]);

  return (
    <div className='form-login'>
      <div className='form-login-box'>
        <div className='form-login-header'>
          <Heading level={2}>Hello again!</Heading>
          {!method ? (
            <Paragraph>
              <Text>
                Change login method to <Text highlight>Web Authentication</Text>{' '}
                by clicking{' '}
                <Text link='/login?method=authn' onClick={redirectToWebAuthn}>
                  here
                </Text>
                .
              </Text>
            </Paragraph>
          ) : (
            <Paragraph>
              <Text>
                Change login method to <Text highlight>Password</Text> by
                clicking{' '}
                <Text link='/login' onClick={redirectToPassword}>
                  here
                </Text>
                .
              </Text>
            </Paragraph>
          )}
        </div>
        <div className='form-login-box-entry'>
          <Heading
            level={5}
            onClick={clickOnFocus(loginRef)}
            className='form-login-box-heading'
          >
            Username
          </Heading>
          <Input
            ref={loginRef}
            className='form-login-box-input'
            type='text'
            name='username'
            autoComplete='username'
            placeholder='Username'
            onKeyUp={onEnter(
              !method ? focusNextOnEnter(passwordRef) : onLoginHandler
            )}
          />
        </div>

        {!method && (
          <div className='form-login-box-entry'>
            <Heading
              level={5}
              className='form-login-box-heading'
              onClick={clickOnFocus(passwordRef)}
            >
              Password
            </Heading>
            <Input
              ref={passwordRef}
              className='form-login-box-input'
              type='password'
              name='password'
              autoComplete='password'
              placeholder='Password'
              onKeyUp={onEnter(onLoginHandler as Function)}
            />
          </div>
        )}
      </div>

      <ProceedButton
        type='button'
        className='button-login'
        onClick={onLoginHandler}
      >
        Login
      </ProceedButton>
    </div>
  );
};
