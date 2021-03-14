import { FC } from 'react';
import NavigationControllBack from './go-back';
import NavigationControllForward from './go-forward';
import './styles/navigation.scss';

export interface NavigationControllsProps {
  [key: string]: any;
}

export const NavigationControlls: FC<NavigationControllsProps> = () => {
  return (
    <div className="navigation-controlls">
      <NavigationControllBack />
      <NavigationControllForward />
    </div>
  );
};

export default NavigationControlls;
