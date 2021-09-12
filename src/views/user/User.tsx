import { lazy } from 'react';
import { PageTemplate } from '@/components/common/page-template';
import UserLoader from '@/components/main/loader';
import { RouteChildrenProps } from 'react-router-dom';

export interface UserPageParams {
  username: string;
}

const User = lazy(() => import(
  /* webpackChunkName: "main-page_me_profile" */
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  '@/components/user'
));

export const UserPage = (props: RouteChildrenProps<UserPageParams>) => {
  return (
    <PageTemplate
      errorPage={null}
      fallbackComponent={<UserLoader />}
      title={`Profile ${props.match?.params.username} - Neutrino Chat`}
      canOperateOffline
    >
      <User />
    </PageTemplate>
  );
};

export default UserPage;
