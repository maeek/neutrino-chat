import { FC, MouseEvent } from 'react';
import { RouteProps, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LayoutContentFooter from '@maeek/neutrino-design/components/layouts/content-footer';
import { GenericFooter } from '@components/common/footer/generic';
import Navigator from '@utils/navigation';
import { login } from '@actions/login';
import { LoginForm } from './form';
import './styles/login.scss';
interface LoginViewProps extends RouteProps {
  from: {
    pathname: string;
  }
  [key: string]: any;
}

export const LoginView: FC<LoginViewProps> = (props) => {
  const { from } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogin = async (username: string, password: string) => {
    dispatch(login(username, password, { history, from }));
  };

  const redirectToRegister = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    Navigator.forward(history, '/join');
  };


  return (
    <div className="view-root view-root--login">
      <LayoutContentFooter footerNode={<GenericFooter />}>
        <LoginForm
          onLogin={onLogin}
          redirectToRegister={redirectToRegister}
        />
      </LayoutContentFooter>
    </div>
  );
};

export default LoginView;
