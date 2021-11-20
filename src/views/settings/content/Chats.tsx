import { lazy } from 'react';

const SettingsChats = lazy(() => import(
  /* webpackChunkName: "page-settings-chats" */
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  '@/components/settings/pages/chats'
));

export const SettingsChatsPage = () => {
  return (
    <SettingsChats />
  );
};

export default SettingsChatsPage;
