import { lazy } from 'react';

const SettingsSecurity = lazy(() => import(
  /* webpackChunkName: "page-settings-security" */
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  '@/components/settings/pages/security'
));

export const SettingsSecurityPage = () => {
  return (
    <SettingsSecurity />
  );
};

export default SettingsSecurityPage;
