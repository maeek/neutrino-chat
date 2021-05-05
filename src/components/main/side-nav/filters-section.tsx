import { useState } from 'react';
import { NavItem } from '@maeek/neutrino-design/components/molecules/navigation/Item';
import { sideBarConfig } from './config';
import '../styles/sidebar.scss';

export const SideBarNavFiltersSection = () => {
  const [ selectedFilters, setSelectedFilters ] = useState<string[]>([]);

  return (
    <>
      {
        sideBarConfig.filtersSection.map((item) => (
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
