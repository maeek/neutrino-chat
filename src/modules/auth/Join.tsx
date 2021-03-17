import { FC, lazy } from 'react';
import { useSelector } from 'react-redux';
import { RouteProps, useHistory, useLocation } from 'react-router-dom';
import { PageTemplate } from '../../components/common/page-template';
import { RootState } from '../../store/root';
import { getAuthToken, getAuthRefreshToken } from '../../store/session/selectors';
import Navigator from '../../utils/navigation';

const JoinView = lazy(() => import(
  /* webpackChunkName: "main-page_join" */
  /* webpackMode: "lazy" */
  '../../components/join'
));

interface JoinPageProps extends RouteProps {}

export const JoinPage: FC<JoinPageProps> = (...props) => {
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
      title="Neutrino Chat - Join"
      canOperateOffline={false}
    >
      <JoinView from={from} {...props} />
    </PageTemplate>
  );
};

export default JoinPage;
