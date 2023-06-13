import { NavItem } from '@maeek/neutrino-design/components/navigation/Item';
import { useHistory, useLocation } from 'react-router-dom';
import Navigator from '@/utils/navigation';
import { sideNavConfig } from './config';
import { useSelector } from 'react-redux';
import { getMeRole } from '@/selectors/user';
import { UserRole } from '@/store/me/user/types';

export const SideNavMainSection = () => {
  const loc = useLocation();
  const history = useHistory();
  const isAdmin = useSelector(getMeRole) === UserRole.ADMIN;

  const navigate = (link: string) => () => {
    Navigator.forward(history, link);
  };

  return (
    <>
      {sideNavConfig.mainSection
        .filter((item) => isAdmin || !item.adminOnly)
        .map((item) => (
          <NavItem
            key={item.name}
            icon={item.icon}
            active={loc.pathname.substr('/settings/'.length) === item.category}
            onClick={navigate(`/settings/${item.category}`)}
          >
            {item.node || item.name}
          </NavItem>
        ))}
    </>
  );
};
