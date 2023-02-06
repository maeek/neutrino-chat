import { Heading } from '@maeek/neutrino-design/components/typography/heading';
import { Text } from '@maeek/neutrino-design/components/typography/text';
import { User } from '../types';
import { RegisterFormHeader } from './header';
import { RegisterFormBox } from './box';
import './form.scss';

interface RegisterFormProps {
  onRegister?: (user: User) => void;
  redirectToLogin?: Function;
}

export const RegisterForm = ({
  onRegister,
  redirectToLogin
}: RegisterFormProps) => (
  <div className='form-register'>
    <Heading>Neutrino Chat</Heading>

    <RegisterFormHeader />

    <RegisterFormBox onRegister={onRegister} />

    <div className='form-register-footer'>
      <Text>Already have an account?</Text>{' '}
      <Text link='/login' onClick={redirectToLogin}>
        Log in
      </Text>
    </div>
  </div>
);
