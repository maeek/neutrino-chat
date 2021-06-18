import { MouseEventHandler, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import { getContactById, getContactIsInStarred } from '@/selectors/contacts';
import { RootState } from '@/store/root';
import { Contact } from '@/store/me/contacts/types';
import { Heading } from '@maeek/neutrino-design/components/atoms/typography/heading';
import { Text } from '@maeek/neutrino-design/components/atoms/typography/text';
import { SecondaryButton } from '@maeek/neutrino-design/components/atoms/buttons/Secondary';
import ImageContainerCached from '@maeek/neutrino-design/components/atoms/image/Image';
import { MoreHorizRounded, StarBorderRounded, StarRounded } from '@material-ui/icons';
import { addMembersToGroup, removeMembersFromGroup } from '@/store/me/groups/actions';
import { GroupTypeEnum } from '@/store/me/groups/types';
import Navigator from '@/utils/navigation';
import { getHslColorFromCharCode } from '@/utils/getHslColorFromCharCode';
import './contact-card.scss';

export interface ContactCardProps {
  id: string;
}

export const ContactCard = ({ id }: ContactCardProps) => {
  const contact = useSelector<RootState, Contact>(getContactById(id));
  const contactIsInStarred = useSelector(getContactIsInStarred(id));
  const [ isValidAvatar, setIsValidAvatar ] = useState(true);
  const isReducedData = useMediaQuery({ query: '(prefers-reduced-data: reduce)' });
  const dispatch = useDispatch();
  const history = useHistory();

  const noAvatarPlaceholer = useMemo(() => {
    const assignedColor = getHslColorFromCharCode(contact.username, '100%', '75%', 0.25);
    return contact.username ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="repeat-text">
        <defs>
          <pattern id={`bg-contact-pattern-${contact.username}`} x="0" y="0" width="1" height="0.31rem">
            <text x="0" y="2rem" className="watermark" fill={assignedColor}>
              {new Array(9).fill(contact.username).join(' ')}
            </text>
            <text x="1.5rem" y="4.4rem" className="watermark" fill={assignedColor}>
              {new Array(9).fill(contact.username).join(' ')}
            </text>
          </pattern>
        </defs>
      
        <rect fill={`url(#bg-contact-pattern-${contact.username})`} width="100%" height="100%"/>
      </svg>
    ) : null;
  }, [ contact.username ]);

  const handleStar: MouseEventHandler = () => {
    if (contactIsInStarred) {
      dispatch(removeMembersFromGroup('Starred', [ id ]));
    } else {
      dispatch(addMembersToGroup('Starred', [ { id, type: GroupTypeEnum.CONTACT } ]));
    }
  };

  const navToUser: MouseEventHandler = (e) => {
    e.preventDefault();
    Navigator.forward(history, `/u/${contact.username}`);
  };

  const stopPropagation: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <li className="card contact-card">
      <a href={`/u/${contact.username}`} onClick={navToUser}>
        <figure>
          <figcaption>
            <Heading className="contact-card-name" level={4}>
              {
                contact.username.length > 175
                  ? `${contact.username.substr(0, 175)}...`
                  : contact.username
              }
            </Heading>
          </figcaption>
          <picture>
            <ImageContainerCached
              src="https://static.suchanecki.me/pepee1.jpg"
              className={isValidAvatar || isReducedData ? '' : 'no-display'}
              loader={noAvatarPlaceholer}
              onImageLoaded={(e) => setIsValidAvatar(!e)}
            />
            {!isValidAvatar && noAvatarPlaceholer}
            
          </picture>
          <div className="contact-card-details" onClick={stopPropagation}>
            <div className="contact-card-actions">
              <div className="contact-card-actions-more">
                <div className="contact-card-actions-more-item">
                  <Text>
                    <MoreHorizRounded />
                  </Text>
                </div>
              </div>
              <SecondaryButton
                onClick={handleStar}
                className="contact-card-action"
                data-starred={contactIsInStarred}
              >
                {
                  contactIsInStarred
                    ? <StarRounded />
                    : <StarBorderRounded />
                }
              </SecondaryButton>
            </div>
          </div>
        </figure>
      </a>
    </li>
  );
};
