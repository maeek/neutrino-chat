import { NavItem } from '@maeek/neutrino-design/components/navigation/Item';
import { useHistory, useLocation } from 'react-router-dom';
import Navigator from '@/utils/navigation';
import { sideNavConfig } from './config';

export const SideNavMainSection = () => {
  const loc = useLocation();
  const history = useHistory();

  const navigate = (link: string) => () => {
    Navigator.forward(history, link);
  };

  return (
    <>
      {sideNavConfig.mainSection.map((item) => (
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
