import { lazy } from 'react';

const SettingsNotifications = lazy(() => import(
  /* webpackChunkName: "page-settings-notifications" */
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  '@/components/settings/pages/notifications'
));

export const SettingsNotificationsPage = () => {
  return (
    <SettingsNotifications />
  );
};

export default SettingsNotificationsPage;
