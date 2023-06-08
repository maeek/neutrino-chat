import SettingsPageTemplate from '../settings-page-template';
import './security.scss';
import DeleteAccountSetting from './settings/delete-account';
import SessionsSetting from './settings/sessions-setting';

export const SettingsSecurity = () => {
  return (
    <SettingsPageTemplate name="Security Settings" className="settings-page-security">
      <SessionsSetting />
      <DeleteAccountSetting />
    </SettingsPageTemplate>
  );
};

export default SettingsSecurity;
