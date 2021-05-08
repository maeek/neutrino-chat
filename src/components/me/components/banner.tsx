import { useSelector } from 'react-redux';
import classnames from 'classnames';
import { BackgroundImage } from '@/components/common/background-image/background-image';
import { AddPhotoAlternateRounded } from '@material-ui/icons';
import { getMeBanner } from '@/selectors/user';
import './banner.scss';

export const ProfileBanner = () => {
  const banner = useSelector(getMeBanner);

  const classes = classnames(
    'me-profile-banner',
    !banner && 'me-profile-banner--empty'
  );

  return (
    <div className={classes}>
      {
        banner
          ? <BackgroundImage opacity={1} blur="0" url={banner} />
          : null
      }
      <div className="me-profile-banner-edit">
        <AddPhotoAlternateRounded />
      </div>
    </div>
  );
};

export default ProfileBanner;
