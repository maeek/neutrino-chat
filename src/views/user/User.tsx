import { lazy } from 'react';
import { PageTemplate } from '@/components/common/page-template';
import UserLoader from '@/components/main/loader';
import { RouteChildrenProps } from 'react-router-dom';
import { GenericError } from '@/components/common/error';

export interface UserPageParams {
  username: string;
}

const User = lazy(() => import(
  /* webpackChunkName: "page-settings-user" */
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  '@/components/user'
));

export const UserPage = (props: RouteChildrenProps<UserPageParams>) => {
  return (
    <PageTemplate
      startFromTop
      errorPage={(err: string) => <GenericError message={err} />}
      fallbackComponent={<UserLoader />}
      title={` Neutrino Chat - ${props.match?.params.username}`}
      canOperateOffline
      className='page-root--user'
    >
      <User />
    </PageTemplate>
  );
};

export default UserPage;
