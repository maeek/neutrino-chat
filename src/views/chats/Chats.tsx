import { lazy } from 'react';
import { PageTemplate } from '@/components/common/page-template';
import ChatsViewLoader from '@/components/chats/loader';
import ChatsViewError from '@/components/chats/error';

const ChatsView = lazy(() => import(
  /* webpackChunkName: "main-page_chats" */
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  '@/components/chats'
));

export const MainPage = () => {
  return (
    <PageTemplate
      errorPage={(err: string) => <ChatsViewError message={err} />}
      fallbackComponent={<ChatsViewLoader />}
      title="Neutrino Chat"
      canOperateOffline={false}
      startFromTop
    >
      <ChatsView />
    </PageTemplate>
  );
};

export default MainPage;
