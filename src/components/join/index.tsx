import { MouseEvent, useEffect, useState } from 'react';
import { RouteProps, useHistory } from 'react-router-dom';
import { GenericFooter } from '@/components/common/footer/generic';
import Navigator from '@/utils/navigation';
import { RegisterForm } from './form/';
import { User } from './types';
import { Heading, Text } from '@maeek/neutrino-design';
import { useDispatch } from 'react-redux';
import { register } from '@/actions/auth';
import './join.scss';
import { ApiAdmin } from '@/api/admin';

interface JoinViewProps extends RouteProps {
  from: {
    pathname: string;
  };
}

export const JoinView = (props: JoinViewProps) => {
  const { from } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const [ registrationEnabled, setRegistrationEnabled ] = useState(false);

  useEffect(() => {
    ApiAdmin.getConfig()
      .then((res) => {
        setRegistrationEnabled(res.data.registrationEnabled);
      })
      .catch((err) => {
        console.error(err);
        setRegistrationEnabled(false);
      });
  }, []);

  const onRegister = (user: User) => {
    dispatch(
      register(user.username, {
        password: user.password,
        webAuthn: user.method === 'webauthn',
        history,
        from
      })
    );
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
        {!registrationEnabled ? (
          <div className='form-register'>
            <Text strong>
              <Heading level={2}>Registration is currently disabled!</Heading>
            </Text>
          </div>
        ) : (
          <RegisterForm onRegister={onRegister} />
        )}
        <GenericFooter />
      </div>
    </div>
  );
};

export default JoinView;
