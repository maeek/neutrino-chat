import { FC, lazy } from 'react';
import { useSelector } from 'react-redux';
import { RouteProps } from 'react-router-dom';
import { PageTemplate } from '../../components/common/page-template';
import { RootState } from '../../store/root';
import { getAuthToken, getAuthRefreshToken } from '../../store/session/selectors';

const JoinView = lazy(() => import(
  /* webpackChunkName: "main-page_join" */
  /* webpackMode: "lazy" */
  '../../components/join'
));

interface JoinPageProps extends RouteProps {}

export const JoinPage: FC<JoinPageProps> = (...props) => {
  const isAuthenticated = useSelector((state: RootState) => !!getAuthToken(state) && !!getAuthRefreshToken(state));

  return (
    <PageTemplate
      errorPage={null}
      fallbackComponent={null}
      title="Neutrino Chat - Join"
      canOperateOffline={false}
    >
      <JoinView isAuthenticated={isAuthenticated} {...props} />
    </PageTemplate>
  );
};

export default JoinPage;
