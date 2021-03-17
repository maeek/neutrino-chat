import LayoutContentFooter from '@maeek/neutrino-design/components/layouts/content-footer';
import { FC, MouseEvent } from 'react';
import { RouteProps, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoginForm } from './form';
import { GenericFooter } from '../common/footer/generic';
import { setRefreshToken, setToken } from '../../store/session/actions';
import Navigator from '../../utils/navigation';
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
    // eslint-disable-next-line no-console
    console.log(username, password);
    // Login
    // then
    dispatch(setToken('123'));
    dispatch(setRefreshToken('123'));
    window.localStorage.setItem('token', '123');
    window.localStorage.setItem('refreshToken', '123');

    console.log('Authenticated, redirecting to...', from);
    Navigator.replace(history, from?.pathname || '/');
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