import { BackgroundImage } from '@/components/common/background-image/background-image';
import './page-background.scss';

export interface UserPageBackgroundProps {
  url?: string;
}

export const UserPageBackground = ({ url }: UserPageBackgroundProps) => (
  url ? <BackgroundImage opacity={0.05} blur="10px" url={url} /> : null
);

export default UserPageBackground;
