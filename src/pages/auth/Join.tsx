import React, { FC } from 'react';
import { RouteProps } from 'react-router-dom';
import { PageTemplate } from '../page-template';

const JoinView = React.lazy(() => import(
  /* webpackChunkName: "main-page-join" */
  /* webpackMode: "lazy" */
  '../../components/join'
));

interface JoinPageProps extends RouteProps {}

export const JoinPage: FC<JoinPageProps> = (...props) => {
  return (
    <PageTemplate errorPage={null} fallbackComponent={null} title="Neutrino Chat - Join">
      <JoinView {...props} />
    </PageTemplate>
  );
};

export default JoinPage;
