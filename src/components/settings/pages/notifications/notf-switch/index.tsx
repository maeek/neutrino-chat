import { Checkbox, Heading, Paragraph } from '@maeek/neutrino-design';
import { CheckboxProps } from '@maeek/neutrino-design/components/atoms/inputs/checkbox/Checkbox';
import classNames from 'classnames';
import { forwardRef, MouseEventHandler, useImperativeHandle, useRef } from 'react';
import './checkbox-box.scss';

export interface CheckboxBoxProps extends CheckboxProps {
  title: string;
  field: string;
  name?: string;
  description?: string;
  checked?: boolean;
  onChange?: (field: string, val: boolean) => void;
}

export const CheckboxBox = forwardRef(({
  title,
  name,
  field,
  description,
  checked,
  onChange,
  disabled,
  ...rest
}: CheckboxBoxProps, ref: any) => {
  const checkboxRef = useRef<any>(null);
  const onClickHandler: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (onChange) {
      onChange(field, !checked);
    }
  };

  useImperativeHandle(ref, () => ({
    setChecked: (val: boolean) => {
      if (checkboxRef.current) {
        checkboxRef.current.setChecked(val);
      }
    }
  }));

  return (
    <div className="checkbox-box-container" onClick={onClickHandler}>
      <div className={classNames('checkbox-box-title', disabled && 'checkbox-box-title--disabled')}>
        <Heading level={5}>{title}</Heading>
        <Paragraph>{description}</Paragraph>
      </div>
      <div className="checkbox-box-checkbox">
        <Checkbox
          ref={checkboxRef}
          name={name}
          value={checked}
          disabled={disabled}
          {...rest}
        />
      </div>
    </div>
  );
});
