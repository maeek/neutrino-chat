import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { RouteProps, useHistory } from 'react-router-dom';
import Navigator from '@/utils/navigation';
import { login } from '@/actions/auth';
import { GenericFooter } from '@/components/common/footer/generic';
import { LoginForm } from './form';
import './login.scss';
import { Heading, Text } from '@maeek/neutrino-design';

interface LoginViewProps extends RouteProps {
  from: {
    pathname: string;
  };
}

export const LoginView = (props: LoginViewProps) => {
  const { from } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogin = async (
    username: string,
    password: string,
    webAuthn = false
  ) => {
    await dispatch(login(username, password, { history, from, webAuthn }));
  };

  const redirectToRegister = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    Navigator.forward(history, '/join');
  };

  return (
    <div className='view-root view-root--login'>
      <div className='container-between'>
        <Heading>Sign in</Heading>
        <div className='heading-element'>
          <Text>Don't have an account?</Text>{' '}
          <Text link='/join' onClick={redirectToRegister}>
            Join now
          </Text>
        </div>
      </div>
      <div className='container-centered'>
        <LoginForm onLogin={onLogin} />
        <GenericFooter />
      </div>
    </div>
  );
};

export default LoginView;
