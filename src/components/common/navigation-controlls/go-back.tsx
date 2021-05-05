import { KeyboardEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import { KeyboardArrowLeftRounded } from '@material-ui/icons';
import { RootState } from '@/store/root';
import Navigator from '@/utils/navigation';
import './styles/navigation.scss';

export interface NavigationControllBackProps {
  [key: string]: any;
}

export const NavigationControllBack = () => {
  const history = useHistory();
  const localHistory = useSelector((state: RootState) => state.history);
  const canGoBack = localHistory.currentIndex > 0 && localHistory.stack.length > 0;

  const goBack = () => {
    Navigator.back(history);
  };

  const onEnter = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' && canGoBack) {
      goBack();
    }
  };

  const classes = classnames(
    'navigation-controlls-button', 
    canGoBack 
      ? 'navigation-controlls-button--active'
      : 'navigation-controlls-button--disabled'
  );

  return (
    <span
      onClick={goBack}
      onKeyUp={onEnter}
      tabIndex={canGoBack ? 0 : -1}
      className={classes}
    >
      <KeyboardArrowLeftRounded
        className="navigation-controlls-button-icon"
      />
    </span>
  );
};

export default NavigationControllBack;
