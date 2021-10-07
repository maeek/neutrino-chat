import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import NavItem from '@maeek/neutrino-design/components/molecules/navigation/Item';
import { ExitToAppRounded, SettingsRounded } from '@material-ui/icons';
import Navigator from '@/utils/navigation';
import { logout } from '@/actions/auth';
import './quick-links.scss';

export const ProfileQuickLinks = () => {
  const history = useHistory();
  const isMobile = useMediaQuery({ maxWidth: 786 });
  const dispatch = useDispatch();

  const navigate = (link: string) => () => {
    Navigator.forward(history, link);
  };

  const onLogout = () => {
    dispatch(logout());
  };

  return isMobile ? (
    <ul className="me-profile-links">
      <NavItem onClick={navigate('/settings')} icon={<SettingsRounded />}>Settings</NavItem>
      <NavItem onClick={onLogout} icon={<ExitToAppRounded />}>Log out</NavItem>
    </ul>
  ) : null;
};

export default ProfileQuickLinks;
