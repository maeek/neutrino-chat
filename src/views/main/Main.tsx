import { lazy } from 'react';
import { PageTemplate } from '@/components/common/page-template';
import MainViewLoader from '@/components/main/loader';

const MainView = lazy(() => import(
  /* webpackChunkName: "main-page_app" */
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  '@/components/main'
));

export const MainPage = () => {
  return (
    <PageTemplate
      errorPage={null}
      fallbackComponent={<MainViewLoader />}
      title="Neutrino Chat"
      canOperateOffline={false}
    >
      <MainView />
    </PageTemplate>
  );
};

export default MainPage;
