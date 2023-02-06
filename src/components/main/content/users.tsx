import { useSelector } from 'react-redux';
import { Heading } from '@maeek/neutrino-design/components/typography/heading';
import { getFilteredUsersIds, getFiltersMain } from '@/selectors/filters';
import { FilterCategory } from '@/store/app/filters/types';
import MainList from './list';
import './cards.scss';

export interface UsersCardsProps {}

export const UsersCards = () => {
  const usersIds = useSelector(getFilteredUsersIds);
  const selectedCategory = useSelector(getFiltersMain);

  return usersIds.length > 0 &&
    (selectedCategory === FilterCategory.USER ||
      selectedCategory === FilterCategory.ALL) ? (
    <div className='cards'>
      <Heading level={3} className='main-side-filter-heading'>
        Users
      </Heading>
      <MainList />
    </div>
  ) : null;
};

export default UsersCards;
