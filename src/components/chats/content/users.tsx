import { useSelector } from 'react-redux';
import { Heading } from '@maeek/neutrino-design/components/atoms/typography/heading';
import { getFilteredUsersIds, getFiltersMain } from '@/selectors/filters';
import { FilterCategory } from '@/store/app/filters/types';
import UserDmList from './dm-list';
import './cards.scss';

export interface UsersCardsProps {}

export const UsersCards = () => {
  const usersIds = useSelector(getFilteredUsersIds);
  const selectedCategory = useSelector(getFiltersMain);

  return usersIds.length > 0
    && (selectedCategory === FilterCategory.USER || selectedCategory === FilterCategory.ALL)
    ? (
      <div className="cards">
        <Heading level={3} className="main-side-filter-heading">Direct Messages</Heading>
        <UserDmList />
      </div>
    )
    : null;
};

export default UsersCards;