import { useSelector } from 'react-redux';
import { Heading } from '@maeek/neutrino-design/components/atoms/typography/heading';
import { getFilteredContactsIds, getFiltersMain } from '@/selectors/filters';
import { FilterCategory } from '@/store/app/filters/types';
import { ContactCard } from './cards/contact-card';
import '../styles/contacts.scss';

export interface ContactsCardsProps {}

export const ContactsCards = () => {
  const contactsIds = useSelector(getFilteredContactsIds);
  const selectedCategory = useSelector(getFiltersMain);

  return contactsIds.length > 0
    && (selectedCategory === FilterCategory.CONTACT || selectedCategory === FilterCategory.ALL)
    ? (
      <div className="cards">
        <Heading level={3} className="main-side-filter-heading">Contacts</Heading>
        <div className="cards-list">
          {contactsIds.map((id) => (<ContactCard key={id} id={id} />))}
        </div>
      </div>
    )
    : null;
};

export default ContactsCards;
