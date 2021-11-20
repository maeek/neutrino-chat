import { lazy } from 'react';

const SettingsProfile = lazy(() => import(
  /* webpackChunkName: "page-settings-profile" */
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  '@/components/settings/pages/profile'
));

export const SettingsProfilePage = () => {
  return (
    <SettingsProfile />
  );
};

export default SettingsProfilePage;
