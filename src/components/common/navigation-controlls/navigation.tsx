import { useMediaQuery } from 'react-responsive';
import NavigationControllBack from './go-back';
import NavigationControllForward from './go-forward';
import './styles/navigation.scss';

export interface NavigationControllsProps {
  pwaOnly?: boolean;
  [key: string]: any;
}

export const NavigationControlls = (props: NavigationControllsProps) => {
  const { pwaOnly } = props;
  const isPwa = matchMedia('(display-mode: standalone)').matches;
  const isMobile = useMediaQuery({ maxWidth: 786 });

  return (!pwaOnly || (pwaOnly && isPwa)) && !isMobile ? (
    <div className="navigation-controlls">
      <NavigationControllBack />
      <NavigationControllForward />
    </div>
  ) : <div />;
};

export default NavigationControlls;
