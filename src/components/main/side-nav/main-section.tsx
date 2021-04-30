import { useDispatch, useSelector } from 'react-redux';
import { NavItem } from '@maeek/neutrino-design/components/molecules/navigation/Item';
import { sideBarConfig } from './config';
import '../styles/sidebar.scss';
import { getFiltersMain } from '@selectors/filters';
import { setFilterMain } from '@store/app/filters/actions';

export const SideBarNavMainSection = () => {
  const selectedCategory = useSelector(getFiltersMain);
  const dispatch = useDispatch();

  return (
    <>
      {
        sideBarConfig.mainSection.map((item) => (
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
