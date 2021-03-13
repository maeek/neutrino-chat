import { LayoutContentFooter, LayoutSideContent } from '@maeek/neutrino-design/components/';
import { FC, MouseEvent } from 'react';
import { RouteProps, useHistory, Redirect, useLocation } from 'react-router-dom';
import { GenericFooter } from '../common/footer/generic';
import { RegisterForm } from './form';
import { User } from './types';
import './styles/join.scss';
import NavController from '../../utils/navigation';

interface JoinViewProps extends RouteProps {
  isAuthenticated?: boolean
  [key: string]: any;
}

export const JoinView: FC<JoinViewProps> = (props) => {
  const {isAuthenticated} = props;
  const location = useLocation();
  const history = useHistory();
  const { from } = location?.state || { from: { pathname: '/' } } as any;

  const onRegister = (user: User) => {
    // eslint-disable-next-line no-console
    console.log(user);
    // Register
    // then
    // history.replace('/');
    NavController.replace(history, '/');
  };

  const redirectToLogin = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    NavController.forward(history, '/login');
  };

  if (isAuthenticated) {
    console.warn('You\'re already authenticated, redirecting to...', from?.pathname || '/');
    setTimeout(() => NavController.replace(history, from?.pathname || '/'), 0);
  }

  const sideNode = (
    <div className="view-root--join-sidebar">
      <div className="view-root--join-sidebar-image" />
    </div>
  );

  const redirectNode = (
    <div />
  );

  return (
    <div className="view-root view-root--join">
      <LayoutSideContent sideNode={sideNode}>
        <LayoutContentFooter footerNode={<GenericFooter />}>
          {!isAuthenticated ? 
            <RegisterForm
              onRegister={onRegister}
              redirectToLogin={redirectToLogin}
            />
            : redirectNode
          }
        </LayoutContentFooter>
      </LayoutSideContent>
    </div>
  );
};

export default JoinView;
