import { Heading } from '@maeek/neutrino-design/components/atoms/typography/heading';
import '../styles/contacts.scss';

export interface ContactsCardsProps {}

export const ContactsCards = (props: ContactsCardsProps) => {
  return (
    <div className="cards">
      <Heading level={3} className="main-side-filter-heading">Contacts</Heading>
    </div>
  );
};

export default ContactsCards;
