import { Heading } from '@maeek/neutrino-design/components/typography/heading';
import { Text } from '@maeek/neutrino-design/components/typography/text';
import { User } from '../types';
import { RegisterFormHeader } from './header';
import { RegisterFormBox } from './box';
import './form.scss';

interface RegisterFormProps {
  onRegister?: (user: User) => void;
}

export const RegisterForm = ({ onRegister }: RegisterFormProps) => (
  <div className='form-register'>
    <RegisterFormBox onRegister={onRegister} />
  </div>
);
