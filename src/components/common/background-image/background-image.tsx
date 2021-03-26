import { FC, CSSProperties, useState } from 'react';
import ImageContainerCached from '@maeek/neutrino-design/components/atoms/image/image';
import Loader from '@maeek/neutrino-design/components/molecules/loaders/Loader';
import './background-image.scss';

export interface BackgroundImageProps {
  url: string;
  opacity?: number | string;
  blur?: string;
  position?: string;
  style?: CSSProperties;
}

export const BackgroundImage: FC<BackgroundImageProps> = (props) => {
  const {
    url,
    opacity = 0.1,
    blur = '4px',
    position = 'absolute',
    style
  } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  const styles = {
    opacity: isLoaded ? opacity : 0.5,
    position,
    filter: isLoaded ? `blur(${blur})` : 'unset',
    ...style
  } as CSSProperties;

  return (
    <div className="background-image-container" style={styles}>
      <ImageContainerCached
        src={url}
        loader={<Loader style={{paddingTop: '5rem'}} />}
        onImageLoaded={() => setIsLoaded(true)}
        draggable={false}
        style={{objectFit: 'cover'}}
      />
    </div>
  );
};