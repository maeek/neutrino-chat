import { useSelector } from 'react-redux';
import { getMeBanner } from '@/selectors/user';
import { BackgroundImage } from '@/components/common/background-image/background-image';
import './page-background.scss';

export const ProfilePageBackground = () => {
  const banner = useSelector(getMeBanner);

  return banner ? <BackgroundImage opacity={0.05} blur="10px" url={banner} /> : null;
};

export default ProfilePageBackground;
