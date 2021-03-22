import { FC, MouseEvent } from 'react';
import { RouteProps, useHistory } from 'react-router-dom';
import { LayoutContentFooter } from '@maeek/neutrino-design/components/layouts/content-footer';
import { LayoutSideContent } from '@maeek/neutrino-design/components/layouts/side-content';
import { GenericFooter } from '@components/common/footer/generic';
import Navigator from '@utils/navigation';
import { RegisterForm } from './form';
import { User } from './types';
import './styles/join.scss';

interface JoinViewProps extends RouteProps {
  from: {
    pathname: string;
  };
  [key: string]: any;
}

export const JoinView: FC<JoinViewProps> = (props) => {
  const { from } = props;
  const history = useHistory();

  const onRegister = (user: User) => {
    // eslint-disable-next-line no-console
    console.log(user);
    // Register
    // then
    Navigator.replace(history, from?.pathname);
  };

  const redirectToLogin = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    Navigator.forward(history, '/login');
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
