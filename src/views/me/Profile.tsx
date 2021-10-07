import { lazy } from 'react';
import { PageTemplate } from '@/components/common/page-template';
import ProfileLoader from '@/components/main/loader';

const Profile = lazy(() => import(
  /* webpackChunkName: "main-page_me_profile" */
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  '@/components/me'
));

export const ProfilePage = () => {
  return (
    <PageTemplate
      startFromTop
      errorPage={null}
      fallbackComponent={<ProfileLoader />}
      title="Neutrino Chat - Profile"
      canOperateOffline
    >
      <Profile />
    </PageTemplate>
  );
};

export default ProfilePage;
