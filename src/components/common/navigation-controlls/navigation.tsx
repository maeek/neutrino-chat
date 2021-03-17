import { FC } from 'react';
import NavigationControllBack from './go-back';
import NavigationControllForward from './go-forward';
import './styles/navigation.scss';

export interface NavigationControllsProps {
  pwaOnly?: boolean;
  [key: string]: any;
}

export const NavigationControlls: FC<NavigationControllsProps> = (props) => {
  const { pwaOnly } = props;
  const isPwa = matchMedia('(display-mode: standalone)').matches;

  return !pwaOnly || (pwaOnly && isPwa) ? (
    <div className="navigation-controlls">
      <NavigationControllBack />
      <NavigationControllForward />
    </div>
  ) : <div />;
};

export default NavigationControlls;
