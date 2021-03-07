import React, { FC } from 'react';
import { RouteProps } from 'react-router-dom';
import { PageTemplate } from '../page-template';

const LoginView = React.lazy(() => import('../../components/login'));

interface LoginPageProps extends RouteProps {}

export const LoginPage: FC<LoginPageProps> = (...props) => {
  return (
    <PageTemplate errorPage={null} fallbackComponent={null} title="Neutrino Chat - Login">
      <LoginView {...props} />
    </PageTemplate>
  );
};

export default LoginPage;
