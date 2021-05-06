import { useState } from 'react';
import { NavItem } from '@maeek/neutrino-design/components/molecules/navigation/Item';
import { sideNavConfig } from './config';
// import './filters-section.scss';

export const SideNavFiltersSection = () => {
  const [ selectedFilters, setSelectedFilters ] = useState<string[]>([]);

  return (
    <>
      {
        sideNavConfig.filtersSection.map((item) => (
          <NavItem
            key={item.name}
            icon={item.icon}
            active={selectedFilters.includes(item.name)}
            onClick={() => {
              setSelectedFilters((filters) => (
                filters.includes(item.name) 
                  ? filters.filter(f => f !== item.name)
                  : [ ...filters, item.name ]
              ));
              item.action();
            }}
          >
            {item.node || item.name}
          </NavItem>
        ))
      }
    </>
  );
};
