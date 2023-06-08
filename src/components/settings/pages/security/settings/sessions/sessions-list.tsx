import { useSelector } from 'react-redux';
import { SessionsListEntry } from './session-entry';
import './sessions-list.scss';

export const SessionsList = () => {
  // const sessions = useSelector()
  const sessions = [
    {
      id: '1',
      device: 'Chrome'
    },
    {
      id: '2',
      device: 'Firefox'
    },
    {
      id: '3',
      device: 'Safari'
    }
  ];

  return (
    <ul className='settings-sessions-list'>
      {sessions.map((session) => (
        <SessionsListEntry id={session.id} />
      ))}
    </ul>
  );
};
