import { lazy } from 'react';
import { PageTemplate } from '@/components/common/page-template';
import MainViewLoader from '@/components/main/loader';
import MainViewError from '@/components/main/error';

const MainView = lazy(() => import(
  /* webpackChunkName: "page-app" */
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  '@/components/main'
));

export const MainPage = () => {
  return (
    <PageTemplate
      errorPage={(err: string) => <MainViewError message={err} />}
      fallbackComponent={<MainViewLoader />}
      title="Neutrino Chat"
      canOperateOffline={false}
    >
      <MainView />
    </PageTemplate>
  );
};

export default MainPage;
