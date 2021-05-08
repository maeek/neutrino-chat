import { getMeUsername } from '@/selectors/user';
import { Heading } from '@maeek/neutrino-design/components/atoms/typography/heading';
import { useSelector } from 'react-redux';
import './username.scss';

export const ProfileUsername = () => {
  const username = useSelector(getMeUsername);

  return <Heading className="me-profile-username" level={3}>{username}</Heading>;
};

export default ProfileUsername;
