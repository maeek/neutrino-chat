import { MouseEvent, MouseEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContactById, getContactIsInStarred } from '@/selectors/contacts';
import { RootState } from '@/store/root';
import { Contact } from '@/store/me/contacts/types';
import { Heading } from '@maeek/neutrino-design/components/atoms/typography/heading';
import { Text } from '@maeek/neutrino-design/components/atoms/typography/text';
import { ActionButton } from '@maeek/neutrino-design/components/atoms/buttons/Action';
import { SecondaryButton } from '@maeek/neutrino-design/components/atoms/buttons/Secondary';
import { MoreHorizRounded, SendRounded, StarBorderRounded, StarRounded } from '@material-ui/icons';
import { addMembersToGroup, removeMembersFromGroup } from '@/store/me/groups/actions';
import './contact-card.scss';
import { GroupTypeEnum } from '@/store/me/groups/types';

export interface ContactCardProps {
  id: string;
}

export const ContactCard = ({ id }: ContactCardProps) => {
  const contact = useSelector<RootState, Contact>(getContactById(id));
  const contactIsInStarred = useSelector(getContactIsInStarred(id));
  const dispatch = useDispatch();

  const handleStar: MouseEventHandler = () => {
    if (contactIsInStarred) {
      dispatch(removeMembersFromGroup('Starred', [ id ]));
    } else {
      dispatch(addMembersToGroup('Starred', [ { id, type: GroupTypeEnum.CONTACT } ]));
    }
  };

  return (
    <li className="card contact-card">
      <Heading className="contact-card-name" level={4}>
        {
          contact.username.length > 175
            ? `${contact.username.substr(0, 175)}...`
            : contact.username
        }
      </Heading>
      <div className="contact-card-details">
        <div className="contact-card-actions">
          <div className="contact-card-actions-more">
            <div className="contact-card-actions-more-item">
              <Text link={`/me/contacts/${id}`} onClick={(e: MouseEvent) => e.preventDefault()}>
                <MoreHorizRounded />
              </Text>
            </div>
          </div>
          <SecondaryButton
            onClick={handleStar}
            className="contact-card-action"
            data-starred={Boolean(contactIsInStarred)}
          >
            {
              contactIsInStarred
                ? <StarRounded />
                : <StarBorderRounded />
            }
          </SecondaryButton>
          <ActionButton className="contact-card-action" title="Direct Message">
            <SendRounded />
          </ActionButton>
        </div>
      </div>
    </li>
  );
};
