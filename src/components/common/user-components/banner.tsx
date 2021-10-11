import { MouseEventHandler, useState } from 'react';
import classnames from 'classnames';
import { BackgroundImage } from '@/components/common/background-image/background-image';
import { AddPhotoAlternateRounded } from '@material-ui/icons';
import { Modal } from '@maeek/neutrino-design';
import './banner.scss';
import { ImagePreview } from '../image-preview/image-preview';

export interface UserBannerProps {
  url?: string;
  editable?: boolean;
  blur?: string;
  opacity?: number;
  onEdit?: () => void;
  expandOnClick?: boolean;
}

export const UserBanner = ({
  url,
  editable,
  blur = '0',
  opacity = 1,
  onEdit,
  expandOnClick
}: UserBannerProps) => {
  const [ isExpanded, setIsExpanded ] = useState(false);
  const classes = classnames(
    'me-profile-banner',
    !url && 'me-profile-banner--empty'
  );
  
  const onClickHandler: MouseEventHandler = () => {
    if (expandOnClick && url) {
      setIsExpanded(true);
    }
  };

  return (
    <>
      <div className={classes} onClick={onClickHandler}>
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
      {url && <ImagePreview url={url} isOpened={isExpanded} onClose={() => setIsExpanded(false)} />}
    </>
  );
};

export default UserBanner;
