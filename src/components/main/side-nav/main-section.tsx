import { useDispatch, useSelector } from 'react-redux';
import { NavItem } from '@maeek/neutrino-design/components/molecules/navigation/Item';
import { sideNavConfig } from './config';
import { getFiltersMain } from '@/selectors/filters';
import { setFilterMain } from '@/store/app/filters/actions';

export const SideNavMainSection = () => {
  const selectedCategory = useSelector(getFiltersMain);
  const dispatch = useDispatch();

  return (
    <>
      {
        sideNavConfig.mainSection.map((item) => (
          <NavItem
            key={item.name}
            icon={item.icon}
            active={selectedCategory === item.category}
            onClick={() => {
              dispatch(setFilterMain(item.category));
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
