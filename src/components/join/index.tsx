import { LayoutContentFooter, LayoutSideContent, Heading, Paragraph } from '@maeek/neutrino-design/components/';
import { FC, MouseEvent, useState } from 'react';
import { Redirect, RouteProps, useHistory } from 'react-router-dom';
import { GenericFooter } from '../common/footer/generic';
import { RegisterForm } from './form';
import './styles/join.scss';

interface JoinViewProps extends RouteProps {
  // isAuthenticated?: boolean;
  [key: string]: any;
}

export const JoinView: FC<JoinViewProps> = (props) => {
  // const { isAuthenticated, location } = props;
  // const { from } = location?.state || { from: { pathname: '/' } } as any;
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const onRegister = () => {
    // eslint-disable-next-line no-console
    console.log(username, password, passwordRepeat);
    // Register
    // then
    history.replace('/');
  };

  const redirectToLogin = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    history.push('/login');
  };

  const validatePasswords = (): boolean => {
    return password.length > 0 && password === passwordRepeat;
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
            setUsername={setUsername}
            setPassword={setPassword}
            setPasswordRepeat={setPasswordRepeat}
            validatePasswords={validatePasswords}
          />
        </LayoutContentFooter>
      </LayoutSideContent>
    </div>
  );
};

export default JoinView;
