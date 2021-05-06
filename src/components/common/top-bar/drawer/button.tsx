import {
  KeyboardEvent,
  useRef
} from 'react';
import { NotificationsNoneRounded } from '@material-ui/icons';
import './button.scss';

export interface NotificationsDrawerButtonProps {
  onOpen?: () => void;
}

export const NotificationsDrawerButton = ({ onOpen }: NotificationsDrawerButtonProps) => {
  const bellIconRef = useRef<HTMLSpanElement>(null);

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
    >
      <NotificationsNoneRounded />
    </span>
  );
};

export default NotificationsDrawerButton;
