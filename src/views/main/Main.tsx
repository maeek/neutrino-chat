import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import { PageTemplate } from '@/components/common/page-template';
import MainViewLoader from '@/components/main/loader';

const MainView = lazy(() => import(
  /* webpackChunkName: "main-page_app" */
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  '@/components/main'
));

interface MainPageProps extends RouteProps {}

export const MainPage = (props: MainPageProps) => {
  return (
    <PageTemplate
      errorPage={null}
      fallbackComponent={<MainViewLoader />}
      title="Neutrino Chat"
      canOperateOffline={false}
    >
      <MainView {...props} />
    </PageTemplate>
  );
};

export default MainPage;
