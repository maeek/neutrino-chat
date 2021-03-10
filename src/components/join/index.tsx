import { LayoutContentFooter, LayoutSideContent } from '@maeek/neutrino-design/components/';
import { FC, MouseEvent } from 'react';
import { RouteProps, useHistory } from 'react-router-dom';
import { GenericFooter } from '../common/footer/generic';
import { RegisterForm } from './form';
import { User } from './types';
import './styles/join.scss';

interface JoinViewProps extends RouteProps {
  [key: string]: any;
}

export const JoinView: FC<JoinViewProps> = (props) => {
  const history = useHistory();

  const onRegister = (user: User) => {
    // eslint-disable-next-line no-console
    console.log(user);
    // Register
    // then
    history.replace('/');
  };

  const redirectToLogin = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    history.push('/login');
  };

  const sideNode = (
    <div className="view-root--join-sidebar">
      <div className="view-root--join-sidebar-image" />
    </div>
  );

  return (
    <div className="view-root view-root--join">
      <LayoutSideContent sideNode={sideNode}>
        <LayoutContentFooter footerNode={<GenericFooter />}>
          <RegisterForm
            onRegister={onRegister}
            redirectToLogin={redirectToLogin}
          />
        </LayoutContentFooter>
      </LayoutSideContent>
    </div>
  );
};

export default JoinView;
