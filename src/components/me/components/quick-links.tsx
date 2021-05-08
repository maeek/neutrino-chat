import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router';
import NavItem from '@maeek/neutrino-design/components/molecules/navigation/Item';
import { EditRounded, NotInterestedRounded, SettingsRounded } from '@material-ui/icons';
import Navigator from '@/utils/navigation';
import './quick-links.scss';

export const ProfileQuickLinks = () => {
  const history = useHistory();
  const isMobile = useMediaQuery({ maxWidth: 786 });

  const navigate = (link: string) => () => {
    Navigator.forward(history, link);
  };

  return isMobile ? (
    <ul className="me-profile-links">
      <NavItem onClick={navigate('/me/edit')} icon={<EditRounded />}>Edit Profile</NavItem>
      <NavItem onClick={navigate('/settings')} icon={<SettingsRounded />}>Settings</NavItem>
      <NavItem
        onClick={navigate('/me/deactivate')}
        icon={<NotInterestedRounded />} 
        className="me-profile-links--deactivate"
      >
        Delete Account
      </NavItem>
    </ul>
  ) : null;
};

export default ProfileQuickLinks;
