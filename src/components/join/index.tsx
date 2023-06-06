import { MouseEvent, useMemo } from 'react';
import { RouteProps, useHistory } from 'react-router-dom';
import { LayoutSideContent } from '@maeek/neutrino-design/components/layouts/side-content';
import { LayoutContentFooter } from '@maeek/neutrino-design/components/layouts/content-footer';
import { GenericFooter } from '@/components/common/footer/generic';
import Navigator from '@/utils/navigation';
import { RegisterForm } from './form/';
import { User } from './types';
import './join.scss';
import { Heading, Text } from '@maeek/neutrino-design';

interface JoinViewProps extends RouteProps {
  from: {
    pathname: string;
  };
}

export const JoinView = (props: JoinViewProps) => {
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

  return (
    <div className='view-root view-root--join'>
      <div className='container-between'>
        <Heading>Sign up</Heading>
        <div className='heading-element'>
          <Text>Already have an account?</Text>{' '}
          <Text link='/login' onClick={redirectToLogin}>
            Sign in!
          </Text>
        </div>
      </div>
      <div className='container-centered'>
        <RegisterForm onRegister={onRegister} />
        <GenericFooter />
      </div>
    </div>
  );
};

export default JoinView;
