import { lazy } from 'react';

const SettingsServerMgmt = lazy(() => import(
  /* webpackChunkName: "page-settings-chats" */
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  '@/components/settings/pages/server-mgmt'
));

export const SettingsServerMgmtPage = () => {
  return (
    <SettingsServerMgmt />
  );
};

export default SettingsServerMgmtPage;
