import { Text } from '@maeek/neutrino-design';
import { DeleteRounded } from '@material-ui/icons';
import dayjs from 'dayjs';
import { ApiMe } from '@/api/me';
import './session-entry.scss';

export interface SessionsListEntryProps {
  id: string;
  device: string;
  createdAt: number;
  updateList: () => void;
}

export const SessionsListEntry = ({
  id,
  device,
  createdAt,
  updateList
}: SessionsListEntryProps) => {
  const onRemoveSession = async () => {
    await ApiMe.deleteSessions([id]);
    updateList();
  };

  return (
    <li key={id + '' + createdAt} className='settings-sessions-list-entry'>
      <div className='settings-sessions-list-entry-details'>
        <div className='settings-sessions-list-entry-details-title'>
          {device}
        </div>
        <div>{dayjs(createdAt).from(Date.now())}</div>
      </div>
      <Text
        tabIndex={0}
        className='image-change-cancel'
        type='danger'
        onClick={onRemoveSession}
      >
        <DeleteRounded />
      </Text>
    </li>
  );
};
