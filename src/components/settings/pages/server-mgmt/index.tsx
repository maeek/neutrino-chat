import { CheckboxBox } from '../notifications/notf-switch';
import SettingsPageTemplate from '../settings-page-template';
import { UsersMgmt } from './settings/users-mgmt';
import './server-mgmt.scss';

export const SettingsServerMgmt = () => {
  return (
    <SettingsPageTemplate
      name='Server Management Settings'
      className='settings-page-server-mgmt'
    >
      <div className='settings-page-server-mgmt-checkbox'>
        <CheckboxBox
          field='server-mgmt-1'
          title='Allow for registration of new users'
          description='Allow users to register new accounts on this server'
          checked
        />
      </div>
      <UsersMgmt />
    </SettingsPageTemplate>
  );
};

export default SettingsServerMgmt;
