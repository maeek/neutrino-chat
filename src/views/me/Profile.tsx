import { lazy } from 'react';
import { PageTemplate } from '@/components/common/page-template';
import ProfileLoader from '@/components/main/loader';
import { GenericError } from '@/components/common/error';

const Profile = lazy(() => import(
  /* webpackChunkName: "page-me" */
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  '@/components/me'
));

export const ProfilePage = () => {
  return (
    <PageTemplate
      startFromTop
      errorPage={(err: string) => <GenericError message={err} />}
      fallbackComponent={<ProfileLoader />}
      title="Neutrino Chat - Profile"
      canOperateOffline
    >
      <Profile />
    </PageTemplate>
  );
};

export default ProfilePage;
