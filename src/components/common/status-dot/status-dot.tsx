import classnames from 'classnames';
import './status-dot.scss';

export enum StatusDotState {
  ACTIVE = 'active',
  AWAY = 'away',
  OFFLINE = 'offline',
  UNKNOWN = 'unknown',
}

export enum StatusDotSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

export interface StatusDotProps {
  state?: StatusDotState;
  size?: StatusDotSize;
  className?: string;
}

export const StatusDot = ({ state, size, className, ...rest }: StatusDotProps) => (
  <div
    className={classnames(
      'status-dot',
      `status-dot--${state || StatusDotState.UNKNOWN}`,
      `status-dot--${size || StatusDotSize.SMALL}`,
      className
    )}
    {...rest}
  />
);

export default StatusDot;
