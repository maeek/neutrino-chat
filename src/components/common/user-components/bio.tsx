import { Paragraph } from '@maeek/neutrino-design/components/typography/paragraph';
import './bio.scss';

export interface UserBioProps {
  text?: string;
}

export const UserBio = ({ text }: UserBioProps) => (
  <Paragraph>{text}</Paragraph>
);

export default UserBio;
