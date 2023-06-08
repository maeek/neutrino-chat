import { lazy } from 'react';

const SettingsServerAudit = lazy(() => import(
  /* webpackChunkName: "page-settings-chats" */
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  '@/components/settings/pages/audit'
));

export const SettingsServerAuditPage = () => {
  return (
    <SettingsServerAudit />
  );
};

export default SettingsServerAuditPage;
