import SettingsPageTemplate from '../settings-page-template';
import AvatarSetting from './settings/avatar-setting';
import './profile.scss';
import BioSetting from './settings/bio-setting';

export const SettingsProfile = () => {
  return (
    <SettingsPageTemplate name='Your Profile' className='settings-page-profile'>
      <AvatarSetting />
      <BioSetting />
    </SettingsPageTemplate>
  );
};

export default SettingsProfile;
