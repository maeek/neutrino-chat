import { Heading } from '@maeek/neutrino-design/components/atoms/typography/heading';
import './username.scss';

export interface UserUsernameProps {
  username?: string;
}

export const UserUsername = ({ username }: UserUsernameProps) => (
  <Heading className="me-profile-username" level={3}>{username}</Heading>
);

export default UserUsername;
