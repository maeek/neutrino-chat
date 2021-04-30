import { Heading } from '@maeek/neutrino-design/components/atoms/typography/heading';
import '../styles/channels.scss';

export interface ChannelsCardsProps {}

export const ChannelsCards = (props: ChannelsCardsProps) => {
  return (
    <div className="cards">
      <Heading level={3} className="main-side-filter-heading">Channels</Heading>
      <div style={{margin: '0 1rem 1rem', height: '300px', width: 'auto', background: '#22262b', borderRadius: '4px'}}></div>
    </div>
  );
};

export default ChannelsCards;
