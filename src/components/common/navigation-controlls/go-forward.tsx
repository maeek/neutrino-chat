import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import { KeyboardArrowRightRounded } from '@material-ui/icons';
import NavController from '../../../utils/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/root';
import './styles/navigation.scss';

export interface NavigationControllForwardProps {
  [key: string]: any;
}

export const NavigationControllForward: FC<NavigationControllForwardProps> = () => {
  const history = useHistory();
  const localHistory = useSelector((state: RootState) => state.history);

  const goForward = () => {
    NavController.forward(history);
  };

  const canGoForward = localHistory.stack.length - 1 > localHistory.currentIndex;
  return (
    <KeyboardArrowRightRounded
      onClick={goForward}
      className={classnames('navigation-controlls-button', canGoForward && 'navigation-controlls-button--active')}
    />
  );
};

export default NavigationControllForward;
