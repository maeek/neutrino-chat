import {
  CSSProperties,
  KeyboardEvent,
  useRef
} from 'react';
import { useSelector } from 'react-redux';
import { NotificationsNoneRounded } from '@material-ui/icons';
import './button.scss';
import { getMeColor } from '@/selectors/user';

export interface NotificationsDrawerButtonProps {
  onOpen?: () => void;
}

export const NotificationsDrawerButton = ({ onOpen }: NotificationsDrawerButtonProps) => {
  const bellIconRef = useRef<HTMLSpanElement>(null);
  const meColor = useSelector(getMeColor);
  
  const onEnter = (fn?: () => void) => (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' && fn) {
      fn();
    }
  };

  return (
    <span
      className="top-bar-button-icon"
      tabIndex={0}
      onClick={onOpen}
      onKeyUp={onEnter(onOpen)}
      ref={bellIconRef}
      style={{ color: meColor } as CSSProperties}
    >
      <NotificationsNoneRounded />
    </span>
  );
};

export default NotificationsDrawerButton;
