import { useMediaQuery } from 'react-responsive';
import { useDispatch } from 'react-redux';
import NavItem from '@maeek/neutrino-design/components/navigation/Item';
import { ExitToAppRounded } from '@material-ui/icons';
import { logout } from '@/actions/auth';
import { SideNavMainSection } from '../settings/side-nav/main-section';
import './quick-links.scss';

export const ProfileQuickLinks = () => {
  const isMobile = useMediaQuery({ maxWidth: 786 });
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return isMobile ? (
    <ul className='me-profile-links'>
      <SideNavMainSection />
      <NavItem onClick={onLogout} icon={<ExitToAppRounded />}>
        Log out
      </NavItem>
    </ul>
  ) : null;
};

export default ProfileQuickLinks;
