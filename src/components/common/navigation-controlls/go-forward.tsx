import { FC, KeyboardEvent } from 'react';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import { KeyboardArrowRightRounded } from '@material-ui/icons';
import Navigator from '../../../utils/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/root';
import './styles/navigation.scss';

export interface NavigationControllForwardProps {
  [key: string]: any;
}

export const NavigationControllForward: FC<NavigationControllForwardProps> = () => {
  const history = useHistory();
  const localHistory = useSelector((state: RootState) => state.history);
  const canGoForward = localHistory.stack.length - 1 > localHistory.currentIndex;

  const goForward = () => {
    Navigator.forward(history);
  };

  const onEnter = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' && canGoForward) {
      goForward();
    }
  };

  const classes = classnames(
    'navigation-controlls-button', 
    canGoForward 
      ? 'navigation-controlls-button--active'
      : 'navigation-controlls-button--disabled'
  );

  return (
    <span
      onClick={goForward}
      onKeyUp={onEnter}
      tabIndex={canGoForward ? 0 : -1}
      className={classes}
    >
      <KeyboardArrowRightRounded
        className="navigation-controlls-button-icon"
      />
    </span>
  );
};

export default NavigationControllForward;
