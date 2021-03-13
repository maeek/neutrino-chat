import { FC, lazy } from 'react';
import { useSelector } from 'react-redux';
import { RouteProps } from 'react-router-dom';
import { RootState } from '../../store/root';
import { getAuthToken, getAuthRefreshToken } from '../../store/session/selectors';
import { PageTemplate } from '../../components/common/page-template';

const LoginView = lazy(() => import(
  /* webpackChunkName: "main-page_login" */
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  '../../components/login'
));

interface LoginPageProps extends RouteProps {}

export const LoginPage: FC<LoginPageProps> = (...props) => {
  const isAuthenticated = useSelector((state: RootState) => !!getAuthToken(state) && !!getAuthRefreshToken(state));

  return (
    <PageTemplate
      errorPage={null}
      fallbackComponent={null}
      title="Neutrino Chat - Login"
      canOperateOffline={false}
    >
      <LoginView isAuthenticated={isAuthenticated} {...props} />
    </PageTemplate>
  );
};

export default LoginPage;
