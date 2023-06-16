import { User } from '../types';
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
