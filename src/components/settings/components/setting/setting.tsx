import { MutableRefObject, ReactNode } from 'react';
import { Heading, Input } from '@maeek/neutrino-design';
import classNames from 'classnames';
import './setting.scss';

export interface SettingProps {
  value?: string;
  onChange?(val: string): void;
  name?: ReactNode;
  label?: ReactNode;
  children?: ReactNode;
  validate?(val: string): boolean;
  className?: string;
  inputRef?: MutableRefObject<any>;
}

export const Setting = ({
  name,
  value,
  label,
  validate,
  onChange,
  children,
  className,
  inputRef
}: SettingProps) => {

  return (
    <div className={classNames('setting-grouping', className)}>
      <Heading className="setting-grouping-header" level={4}>{name}</Heading>
      {children}
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        renderLabel={label}
        validate={validate}
        className="setting-grouping-input"
      />
    </div>
  );
};
