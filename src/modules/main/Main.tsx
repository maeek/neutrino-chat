import React, { FC } from 'react';
import { RouteProps } from 'react-router-dom';
import { PageTemplate } from '../../components/common/page-template';

const MainView = React.lazy(() => import(
  /* webpackChunkName: "main-page_app" */
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  '../../components/main'
));

interface MainPageProps extends RouteProps {}

export const MainPage: FC<MainPageProps> = (...props) => {
  return (
    <PageTemplate
      errorPage={null}
      fallbackComponent={null}
      title="Neutrino Chat"
      canOperateOffline={false}
    >
      <MainView {...props} />
    </PageTemplate>
  );
};

export default MainPage;
