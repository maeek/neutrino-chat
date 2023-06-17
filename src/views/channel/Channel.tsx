import { lazy } from 'react';
import { PageTemplate } from '@/components/common/page-template';
import UserLoader from '@/components/main/loader';
import { RouteChildrenProps } from 'react-router-dom';
import { GenericError } from '@/components/common/error';

export interface ChannelPageParams {
  channel: string;
}

const Channel = lazy(
  () =>
    import(
      /* webpackChunkName: "page-settings-user" */
      /* webpackMode: "lazy" */
      /* webpackPrefetch: true */
      /* webpackPreload: true */
      '@/components/channel'
    )
);

export const ChannelPage = (props: RouteChildrenProps<ChannelPageParams>) => {
  return (
    <PageTemplate
      startFromTop
      errorPage={(err: string) => <GenericError message={err} />}
      fallbackComponent={<UserLoader />}
      title={`Chat - ${props.match?.params.channel}`}
      canOperateOffline
      className='page-root--channel'
    >
      <Channel />
    </PageTemplate>
  );
};

export default ChannelPage;
