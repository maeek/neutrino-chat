import { getNotificationsSettingsByKey } from '@/selectors/notifications-settings';
import { setNotifications } from '@/store/settings/notifications/actions';
import {
  Notification,
  NotificationsSettingsState
} from '@/store/settings/notifications/types';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckboxBox, CheckboxBoxProps } from '.';

export interface SwitchStoreWrapperProps
  extends Omit<CheckboxBoxProps, 'field' | 'checked'> {
  field: keyof NotificationsSettingsState;
  innerField: keyof Notification;
}

export const SwitchStoreWrapper = (props: SwitchStoreWrapperProps) => {
  const { field, innerField, disabled } = props;
  const dispatch = useDispatch();
  const setting = useSelector(getNotificationsSettingsByKey(field));
  const checkboxRef = useRef<any>(null);

  const onChangeHandler = (f: string, val: boolean) => {
    if (disabled) return;

    dispatch(setNotifications(f, { [ innerField ]: val }));
    checkboxRef.current?.setChecked(val);
  };

  return (
    <CheckboxBox
      {...props}
      ref={checkboxRef}
      onChange={onChangeHandler}
      checked={setting[ innerField ]}
    />
  );
};
