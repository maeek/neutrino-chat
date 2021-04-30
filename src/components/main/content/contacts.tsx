import { Heading } from '@maeek/neutrino-design/components/atoms/typography/heading';
import '../styles/contacts.scss';

export interface ContactsCardsProps {}

export const ContactsCards = (props: ContactsCardsProps) => {
  return (
    <div className="cards">
      <Heading level={3} className="main-side-filter-heading">Contacts</Heading>
      <div style={{margin: '0 1rem 1rem', height: '300px', width: 'auto', background: '#22262b', borderRadius: '4px'}}></div>
    </div>
  );
};

export default ContactsCards;
