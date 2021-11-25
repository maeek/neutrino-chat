import { lazy } from 'react';
import { PageTemplate } from '@/components/common/page-template';
import ChatsViewLoader from '@/components/chats/loader';
import { GenericError } from '@/components/common/error';

const ChatsView = lazy(() => import(
  /* webpackChunkName: "page-chats" */
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  '@/components/chats'
));

export const MainPage = () => {
  return (
    <PageTemplate
      errorPage={(err: string) => <GenericError message={err} />}
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
