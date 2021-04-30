// import { Text } from '@maeek/neutrino-design/components/atoms/typography/text';
import { GroupsList } from './groups-list';
import NavItem from '@maeek/neutrino-design/components/molecules/navigation/Item';
import { SideBarNavFiltersSection } from './filters-section';
import { SideBarNavMainSection } from './main-section';
import { SortRounded } from '@material-ui/icons';
import '../styles/sidebar.scss';

export const SideBar = () => (
  <aside className="side-nav">
    <nav>
      <ul className="side-nav-items">
        <SideBarNavMainSection />
        <div className="spacer" />
        <SideBarNavFiltersSection />
        <GroupsList />
        <div className="spacer" />
        <NavItem
          icon={<SortRounded />}
          // onClick={}
        >
          Sorting Settings
        </NavItem>
      </ul>
    </nav>
  </aside>
);

