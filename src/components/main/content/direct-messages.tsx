import { getFiltersMain } from '@/selectors/filters';
import { FilterCategory } from '@/store/app/filters/types';
import { Heading } from '@maeek/neutrino-design/components/atoms/typography/heading';
import { useSelector } from 'react-redux';
import './cards.scss';

export interface DMsCardsProps {}

export const DMsCards = () => {
  const selectedCategory = useSelector(getFiltersMain);

  return selectedCategory === FilterCategory.DM || selectedCategory === FilterCategory.ALL
    ? (
      <div className="cards">
        <Heading level={3} className="main-side-filter-heading">DMs</Heading>
        <div style={{
          margin: '0 1rem 1rem', height: '300px', width: 'auto', background: '#22262b', borderRadius: '4px'
        }}></div>
      </div>
    )
    : null;
};

export default DMsCards;
