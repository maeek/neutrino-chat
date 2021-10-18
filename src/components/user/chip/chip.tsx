import classNames from 'classnames';
import { ReactNode } from 'react';
import './chip.scss';

export interface ChipProps {
  children?: ReactNode;
  className?: string;
  [key: string]: any;
}

export const Chip = ({ children, className, ...rest }: ChipProps) => {

  return (
    <div {...rest} className={classNames('ne-chip', className)}>
      {children}
    </div>
  );
};
