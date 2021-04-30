import { Heading } from '@maeek/neutrino-design/components/atoms/typography/heading';
import '../styles/dms.scss';

export interface DMsCardsProps {}

export const DMsCards = (props: DMsCardsProps) => {
  return (
    <div className="cards">
      <Heading level={3} className="main-side-filter-heading">DMs</Heading>
      <div style={{margin: '0 1rem 1rem', height: '300px', width: 'auto', background: '#22262b', borderRadius: '4px'}}></div>
    </div>
  );
};

export default DMsCards;
