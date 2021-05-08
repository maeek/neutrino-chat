import { getMeBio } from '@/selectors/user';
import { Paragraph } from '@maeek/neutrino-design/components/atoms/typography/paragraph';
import { useSelector } from 'react-redux';
import './bio.scss';

export const ProfileBio = () => {
  const bio = useSelector(getMeBio);

  return (
    <Paragraph>{bio}</Paragraph>
  );
};

export default ProfileBio;
