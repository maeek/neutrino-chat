import { LayoutContentFooter } from '@maeek/neutrino-design/components/';
import { FC, MouseEvent } from 'react';
import { Redirect, RouteProps, useHistory } from 'react-router-dom';
import { LoginForm } from './form';
import { GenericFooter } from '../common/footer/generic';
import './styles/login.scss';

interface LoginViewProps extends RouteProps {
  isAuthenticated?: boolean;
  [key: string]: any;
}

export const LoginView: FC<LoginViewProps> = (props) => {
  const { isAuthenticated, location } = props;
  const { from } = location?.state || { from: { pathname: '/' } } as any;
  const history = useHistory();

  if (isAuthenticated) return <Redirect to={from} />;

  const onLogin = (username: string, password: string) => {
    // eslint-disable-next-line no-console
    console.log(username, password);
    // Login
    // then
    history.replace(from);
  };

  const redirectToRegister = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    history.push('/join');
  };

  return (
    <div className="view-root view-root--login">
      <LayoutContentFooter footerNode={<GenericFooter />}>
        <LoginForm
          onLogin={onLogin}
          redirectToRegister={redirectToRegister}
        />
      </LayoutContentFooter>
    </div>
  );
};

export default LoginView;
