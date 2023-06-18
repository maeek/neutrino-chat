import { CheckboxBox } from '../notifications/notf-switch';
import SettingsPageTemplate from '../settings-page-template';
import { UsersMgmt } from './settings/users-mgmt';
import './server-mgmt.scss';
import { useEffect, useState } from 'react';
import { ApiAdmin } from '@/api/admin';

export const SettingsServerMgmt = () => {
  const [ checkbox, setCheckbox ] = useState(false);

  useEffect(() => {
    ApiAdmin.getConfig()
      .then((res) => {
        setCheckbox(res.data.registrationEnabled);
      })
      .catch((err) => {
        console.error(err);
        setCheckbox(false);
      });
  }, []);

  const onCheckboxChange = (field: string, e: boolean) => {
    setCheckbox(e);
    ApiAdmin.setConfig({
      registrationEnabled: e
    })
      .then((res) => {
        setCheckbox(res.data.registrationEnabled);
      })
      .catch((err) => {
        console.error(err);
        setCheckbox(!e);
      });
  };

  return (
    <SettingsPageTemplate
      name='Server Management'
      className='settings-page-server-mgmt'
    >
      <div className='settings-page-server-mgmt-checkbox'>
        <CheckboxBox
          field='server-mgmt-1'
          title='Allow for registration of new users'
          description='Allow users to register new accounts on this server'
          checked={checkbox}
          onChange={onCheckboxChange}
        />
      </div>
      <UsersMgmt />
    </SettingsPageTemplate>
  );
};

export default SettingsServerMgmt;
