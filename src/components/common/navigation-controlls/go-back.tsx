import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import { KeyboardArrowLeftRounded } from '@material-ui/icons';
import NavController from '../../../utils/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/root';
import './styles/navigation.scss';

export interface NavigationControllBackProps {
  [key: string]: any;
}

export const NavigationControllBack: FC<NavigationControllBackProps> = () => {
  const history = useHistory();
  const localHistory = useSelector((state: RootState) => state.history);

  const goBack = () => {
    NavController.back(history);
  };

  const canGoBack = localHistory.currentIndex > 0 && localHistory.stack.length > 0;
  return (
    <KeyboardArrowLeftRounded
      onClick={goBack}
      className={classnames('navigation-controlls-button', canGoBack && 'navigation-controlls-button--active')}
    />
  );
};

export default NavigationControllBack;
