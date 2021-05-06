import { useState } from 'react';
import { GroupsList } from './groups-list';
import NavItem from '@maeek/neutrino-design/components/molecules/navigation/Item';
import { SideNavFiltersSection } from './filters-section';
import { SideNavMainSection } from './main-section';
import { ArrowUpwardRounded, MoreHorizRounded, SortRounded } from '@material-ui/icons';
import './side-nav.scss';

export const SideNav = () => {
  const [ isExpanded, setIsExpanded ] = useState(false);

  const expandedNode = (
    <>
      <div className="spacer" />
      <SideNavFiltersSection />
      <GroupsList />
      <div className="spacer" />
      <NavItem
        icon={<SortRounded />}
        // onClick={}
      >
        Sorting Settings
      </NavItem>
    </>
  );

  return (
    <aside className="side-nav">
      <nav>
        <ul className="side-nav-items">
          <SideNavMainSection />

          {isExpanded ? expandedNode : null}
          
          <NavItem
            icon={isExpanded ? <ArrowUpwardRounded /> : <MoreHorizRounded />}
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {
              isExpanded
                ? 'Show Less'
                : 'Show More'
            }
          </NavItem>
        </ul>
      </nav>
    </aside>
  );
};
