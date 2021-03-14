import { FC, MouseEventHandler, MutableRefObject, useRef } from 'react';
import ProceedButton from '@maeek/neutrino-design/components/atoms/buttons/Proceed';
import { Input } from '@maeek/neutrino-design/components/atoms/inputs/text';
import { Heading } from '@maeek/neutrino-design/components/atoms/typography/heading';
import { Text } from '@maeek/neutrino-design/components/atoms/typography/text';
import { Paragraph } from '@maeek/neutrino-design/components/atoms/typography/paragraph';
import './styles/form.scss';

interface LoginFormProps {
  onHeadingClick?: MouseEventHandler;
  onLogin?: (username: string, password: string) => void;
  redirectToRegister?: Function;
}

export const LoginForm: FC<LoginFormProps> = (props) => {
  const {
    onLogin,
    redirectToRegister,
    onHeadingClick
  } = props;
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

  const focusNextOnEnter = (elementToFocus: MutableRefObject<any>) => () => {
    if (elementToFocus.current) elementToFocus.current.element.focus();
  };

  const onLoginHandler = () => {
    if (!loginRef.current.value) {
      loginRef.current.element.focus();
      return;
    }

    const username = loginRef.current.value;
    const password = passwordRef.current.value;

    if (onLogin) onLogin(username, password);
  };

  return (
    <div className="form-login">
      <Heading onClick={onHeadingClick}>Neutrino Chat</Heading>

      <div className="form-login-header">
        <Heading level={2}>Login</Heading>
        <Paragraph>Welcome back</Paragraph>
      </div>

      <div className="form-login-box">
        <div className="form-login-box-entry">
          <Heading
            level={5}
            onClick={clickOnFocus(loginRef)}
            className="form-login-box-heading"
          >
            Username
          </Heading>
          <Input
            ref={loginRef}
            className="form-login-box-input"
            type="text"
            name="username"
            autoComplete="username"
            placeholder="Username"
            onKeyUp={onEnter(focusNextOnEnter(passwordRef))}
          />
        </div>

        <div className="form-login-box-entry">
          <Heading
            level={5}
            className="form-login-box-heading"
            onClick={clickOnFocus(passwordRef)}
          >
              Password
          </Heading>
          <Input
            ref={passwordRef}
            className="form-login-box-input"
            type="password"
            name="password"
            autoComplete="password"
            placeholder="Password"
            onKeyUp={onEnter(onLoginHandler as Function)}
          />
        </div>
        <div className="form-login-box-entry">
          <Text type="secondary" className="form-login-box-appendix">
            By logging in you accept to use cookies and other methods of storing information on your device
          </Text>
        </div>
      </div>

      <ProceedButton className="button-login" onClick={onLoginHandler}>Login</ProceedButton>

      <div className="form-login-footer">
        <Text>Don't have an account?</Text>
        {' '}
        <Text link="/join" onClick={redirectToRegister}>Join now</Text>
      </div>
    </div>
  );
};
