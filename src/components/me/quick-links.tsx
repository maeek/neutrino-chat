import { useDispatch, useSelector } from 'react-redux';
import {
  ExitToAppRounded,
  SettingsApplicationsRounded,
  VisibilityRounded
} from '@material-ui/icons';
import { logout } from '@/actions/auth';
import Navigator from '@/utils/navigation';
import { sideNavConfig } from '../settings/side-nav/config';
import { useHistory } from 'react-router-dom';
import { useAccessibility } from '@maeek/neutrino-design';
import './quick-links.scss';
import { UserRole } from '@/store/me/user/types';
import { getMeRole } from '@/selectors/user';

export const ProfileQuickLinks = () => {
  const { onEnter } = useAccessibility();
  const history = useHistory();
  const isAdmin = useSelector(getMeRole) === UserRole.ADMIN;

  // const isMobile = useMediaQuery({ maxWidth: 786 });
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  const navigate = (link: string) => () => {
    Navigator.forward(history, link);
  };

  return (
    <ul className='me-profile-links'>
      {sideNavConfig.mainSection
        .filter((item) => !item.adminOnly)
        .map((item) => (
          <li
            tabIndex={0}
            key={item.name}
            onClick={navigate(`/settings/${item.category}`)}
            onKeyUp={onEnter(navigate(`/settings/${item.category}`))}
            className='nav-item'
          >
            <div className='icon'>{item.icon}</div>
            <div>{item.node || item.name}</div>
          </li>
        ))}
      {isAdmin && (
        <>
          <li className='spacer' />
          <li
            className='nav-item'
            tabIndex={0}
            onClick={navigate(`/settings/server`)}
            onKeyUp={onEnter(navigate(`/settings/server`))}
          >
            <div className='icon'>
              <SettingsApplicationsRounded />
            </div>
            <div>Server Management</div>
          </li>
          <li
            className='nav-item'
            tabIndex={0}
            onClick={navigate(`/settings/audit`)}
            onKeyUp={onEnter(navigate(`/settings/audit`))}
          >
            <div className='icon'>
              <VisibilityRounded />
            </div>
            <div>Audit</div>
          </li>
        </>
      )}
      <li className='spacer' />
      <li
        onClick={onLogout}
        onKeyDown={onEnter(onLogout)}
        className='nav-item'
        tabIndex={0}
      >
        <div className='icon'>
          <ExitToAppRounded />
        </div>
        <div>Logout</div>
      </li>
    </ul>
  );
};

export default ProfileQuickLinks;
