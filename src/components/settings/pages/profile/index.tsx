import SettingsPageTemplate from '../settings-page-template';
import AvatarSetting from './settings/avatar-setting';
import './profile.scss';

export const SettingsProfile = () => {

  return (
    <SettingsPageTemplate name="Profile Settings" className="settings-page-profile">
      <AvatarSetting />
    </SettingsPageTemplate>
  );
};

export default SettingsProfile;
