import LayoutContentFooter from '@maeek/neutrino-design/components/layouts/content-footer';
import { FC, MouseEvent } from 'react';
import { RouteProps, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoginForm } from './form';
import { GenericFooter } from '../common/footer/generic';
import { setRefreshToken, setToken } from '../../store/session/actions';
import './styles/login.scss';
import NavController from '../../utils/navigation';
interface LoginViewProps extends RouteProps {
  isAuthenticated?: boolean;
  [key: string]: any;
}

export const LoginView: FC<LoginViewProps> = (props) => {
  const { isAuthenticated } = props;
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { from } = location?.state || { from: { pathname: '/' } } as any;

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
    NavController.replace(history, from?.pathname || '/');
    // history.replace(from);
  };

  const redirectToRegister = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    NavController.forward(history, '/');
  };

  if (isAuthenticated) {
    console.warn('You\'re already authenticated, redirecting to...', from?.pathname || '/');
    setTimeout(() => NavController.replace(history, from?.pathname || '/'), 0);
  }

  const redirectNode = (
    <div />
  );

  return (
    <div className="view-root view-root--login">
      <LayoutContentFooter footerNode={<GenericFooter />}>
        {!isAuthenticated ? 
          <LoginForm
            onLogin={onLogin}
            redirectToRegister={redirectToRegister}
          />
          : redirectNode
        }
      </LayoutContentFooter>
    </div>
  );
};

export default LoginView;
