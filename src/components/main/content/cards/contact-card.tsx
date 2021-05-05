import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { getContactById } from '@/selectors/contacts';
import { RootState } from '@/store/root';
import { Contact } from '@/store/me/contacts/types';
import { Heading } from '@maeek/neutrino-design/components/atoms/typography/heading';
import { Paragraph } from '@maeek/neutrino-design/components/atoms/typography/paragraph';
import { ActionButton } from '@maeek/neutrino-design/components/atoms/buttons/Action';
import './contact-card.scss';
import { SendRounded } from '@material-ui/icons';

export interface ContactCardProps {
  id: string;
}

export const ContactCard = ({ id }: ContactCardProps) => {
  const contact = useSelector<RootState, Contact>(getContactById(id));

  return (
    <div className="card contact-card">
      <Heading className="contact-card-name" level={4}>
        {
          contact.username.length > 175
            ? `${contact.username.substr(0, 175)}...`
            : contact.username
        }
      </Heading>
      <div className="contact-card-details">
        <Paragraph className="contact-card-description">
          Added at {dayjs(contact.added).format('HH:mm on DD/MM/YYYY')}
        </Paragraph>
        <ActionButton className="contact-card-action">
          Direct Message
          <SendRounded />
        </ActionButton>
      </div>
    </div>
  );
};
