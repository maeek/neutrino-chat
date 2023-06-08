import { useSelector } from 'react-redux';
import './session-entry.scss';
import { Text } from '@maeek/neutrino-design';
import { DeleteRounded } from '@material-ui/icons';

export interface SessionsListEntryProps {
  id: string;
  device: string;
}

export const SessionsListEntry = ({ id, device }: SessionsListEntryProps) => {
  return (
    <li key={id} className='settings-sessions-list-entry'>
      <div className='settings-sessions-list-entry-details'>
        <div className='settings-sessions-list-entry-details-title'>
          {device}
        </div>
        <div>5 mins ago</div>
      </div>
      <Text tabIndex={0} className='image-change-cancel' type='danger'>
        <DeleteRounded />
      </Text>
    </li>
  );
};
