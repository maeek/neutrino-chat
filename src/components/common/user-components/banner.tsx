import classnames from 'classnames';
import { BackgroundImage } from '@/components/common/background-image/background-image';
import { AddPhotoAlternateRounded } from '@material-ui/icons';
import './banner.scss';

export interface UserBannerProps {
  url?: string;
  editable?: boolean;
  blur?: string;
  opacity?: number;
  onEdit?: () => void;
}

export const UserBanner = ({
  url,
  editable,
  blur = '0',
  opacity = 1,
  onEdit
}: UserBannerProps) => {
  const classes = classnames(
    'me-profile-banner',
    !url && 'me-profile-banner--empty'
  );

  return (
    <div className={classes}>
      {
        url
          ? <BackgroundImage opacity={opacity} blur={blur} url={url} />
          : null
      }
      {
        editable
          ? (
            <div className="me-profile-banner-edit" onClick={onEdit}>
              <AddPhotoAlternateRounded />
            </div>
          )
          : null
      }
    </div>
  );
};

export default UserBanner;
