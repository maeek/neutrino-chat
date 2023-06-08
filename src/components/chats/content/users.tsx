import { useSelector } from 'react-redux';
import { Heading } from '@maeek/neutrino-design/components/typography/heading';
import { getFilteredUsersIds, getFiltersMain } from '@/selectors/filters';
import { FilterCategory } from '@/store/app/filters/types';
import UserDmList from './list';
import { MessageTypes } from '@/store/messages/types';
import './cards.scss';

export interface UsersCardsProps {
  onSelected?: (id: string, type: MessageTypes) => void;
}

export const UsersCards = ({ onSelected }: UsersCardsProps) => {
  const usersIds = useSelector(getFilteredUsersIds);
  const selectedCategory = useSelector(getFiltersMain);

  return usersIds.length > 0 &&
    (selectedCategory === FilterCategory.USER ||
      selectedCategory === FilterCategory.ALL) ? (
    <div className='cards'>
      <Heading level={3} className='main-side-filter-heading'>
        Messages
      </Heading>
      <UserDmList onSelected={onSelected} />
    </div>
  ) : null;
};

export default UsersCards;
