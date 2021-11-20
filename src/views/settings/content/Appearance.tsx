import { lazy } from 'react';

const SettingsAppearance = lazy(() => import(
  /* webpackChunkName: "page-settings-appearance" */
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  '@/components/settings/pages/appearance'
));

export const SettingsAppearancePage = () => {
  return (
    <SettingsAppearance />
  );
};

export default SettingsAppearancePage;
