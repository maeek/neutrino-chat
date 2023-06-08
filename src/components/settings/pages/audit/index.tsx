import SettingsPageTemplate from '../settings-page-template';
import './audit.scss';

export const SettingsServerAudit = () => {
  return (
    <SettingsPageTemplate
      name='Audit'
      className='settings-page-server-audit'
    ></SettingsPageTemplate>
  );
};

export default SettingsServerAudit;
