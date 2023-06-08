import { useSelector } from 'react-redux';
import './session-entry.scss';

export interface SessionsListEntryProps {
  id: string;
}

export const SessionsListEntry = ({ id }: SessionsListEntryProps) => {
  return (
    <li key={id}>
      <div></div>
      {id}
    </li>
  );
};
