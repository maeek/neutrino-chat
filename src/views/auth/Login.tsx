import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { RouteProps, useHistory, useLocation } from 'react-router-dom';
import { RootState } from '@/store/root';
import { getAuthToken, getAuthRefreshToken } from '@/selectors/session';
import { PageTemplate } from '@/components/common/page-template';
import Navigator from '@/utils/navigation';

const LoginView = lazy(
  () =>
    import(
      /* webpackChunkName: "page-login" */
      /* webpackMode: "lazy" */
      /* webpackPrefetch: true */
      /* webpackPreload: true */
      '@/components/login'
    )
);

interface LoginPageProps extends RouteProps {}

export const LoginPage = (props: LoginPageProps) => {
  const location = useLocation();
  const history = useHistory();
  const isAuthenticated = useSelector(
    (state: RootState) => !!getAuthToken(state) && !!getAuthRefreshToken(state)
  );
  const { from } = location?.state || ({ from: { pathname: '/' } } as any);

  if (isAuthenticated) {
    console.warn(
      "You're already authenticated, redirecting to...",
      from?.pathname || '/'
    );
    setTimeout(() => Navigator.replace(history, from?.pathname || '/'), 0);

    return null;
  }

  return (
    <PageTemplate
      errorPage={null}
      fallbackComponent={null}
      title='Login to Chat'
      canOperateOffline={false}
    >
      <LoginView from={from} {...props} />
    </PageTemplate>
  );
};

export default LoginPage;
