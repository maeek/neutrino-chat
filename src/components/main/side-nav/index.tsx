import { useState } from 'react';
import { GroupsList } from './groups-list';
import NavItem from '@maeek/neutrino-design/components/navigation/Item';
import { Heading } from '@maeek/neutrino-design/components/typography/heading/Heading';
import { SideNavFiltersSection } from './filters-section';
import { SortRounded } from '@material-ui/icons';
import './side-nav.scss';

export const SideNav = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const expandedNode = (
    <>
      <div className='spacer' />
      <SideNavFiltersSection />
      {/* <GroupsList /> */}
      <div className='spacer' />
      <NavItem
        icon={<SortRounded />}
        // onClick={}
      >
        Sorting Settings
      </NavItem>
    </>
  );

  return (
    <aside className='side-nav'>
      <nav>
        <ul className='side-nav-items'>
          {/* <SideNavMainSection /> */}
          {/* <div className="spacer" /> */}
          <li>
            <Heading className='side-nav-items-heading' level={5}>
              Groups
            </Heading>
          </li>
          <GroupsList />

          {isExpanded ? expandedNode : null}

          {/* <NavItem
            icon={isExpanded ? <ArrowUpwardRounded /> : <MoreHorizRounded />}
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {
              isExpanded
                ? 'Show Less'
                : 'Show More'
            }
          </NavItem> */}
        </ul>
      </nav>
    </aside>
  );
};
