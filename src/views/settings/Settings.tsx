import { lazy, ReactNode, useLayoutEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { PageTemplate } from '@/components/common/page-template';
import SettingsViewLoader from '@/components/main/loader';
import SettingsViewError from '@/components/main/error';
import Navigator from '@/utils/navigation';

const SettingsView = lazy(() => import(
  /* webpackChunkName: "page-settings" */
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  '@/components/settings'
));

export interface SettingsPageProps {
  children?: ReactNode;
}

export const SettingsPage = ({ children }: SettingsPageProps) => {
  const { pathname } = useLocation();
  const history = useHistory();

  useLayoutEffect(() => {
    if ([ '/settings', '/settings/' ].includes(pathname)) {
      Navigator.replace(history, '/settings/profile');
    }
  }, [ history, pathname ]);

  return (
    <PageTemplate
      errorPage={(err: string) => <SettingsViewError message={err} />}
      fallbackComponent={<SettingsViewLoader />}
      title="Neutrino Chat - Settings"
      canOperateOffline={false}
      startFromTop
    >
      <SettingsView>{children}</SettingsView>
    </PageTemplate>
  );
};

export default SettingsPage;
