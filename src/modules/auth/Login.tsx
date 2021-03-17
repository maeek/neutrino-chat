import { FC, lazy } from 'react';
import { useSelector } from 'react-redux';
import { RouteProps, useHistory, useLocation } from 'react-router-dom';
import { RootState } from '../../store/root';
import { getAuthToken, getAuthRefreshToken } from '../../store/session/selectors';
import { PageTemplate } from '../../components/common/page-template';
import Navigator from '../../utils/navigation';

const LoginView = lazy(() => import(
  /* webpackChunkName: "main-page_login" */
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  '../../components/login'
));

interface LoginPageProps extends RouteProps {}

export const LoginPage: FC<LoginPageProps> = (...props) => {
  const location = useLocation();
  const history = useHistory();
  const isAuthenticated = useSelector((state: RootState) => !!getAuthToken(state) && !!getAuthRefreshToken(state));
  const { from } = location?.state || { from: { pathname: '/' } } as any;

  if (isAuthenticated) {
    console.warn('You\'re already authenticated, redirecting to...', from?.pathname || '/');
    setTimeout(() => Navigator.replace(history, from?.pathname || '/'), 0);

    return <></>;
  }

  return (
    <PageTemplate
      errorPage={null}
      fallbackComponent={null}
      title="Neutrino Chat - Login"
      canOperateOffline={false}
    >
      <LoginView from={from} {...props} />
    </PageTemplate>
  );
};

export default LoginPage;
