import { CSSProperties, MouseEventHandler, useCallback, useState } from 'react';
import Image from '@maeek/neutrino-design/components/image/Image';
import Loader from '@maeek/neutrino-design/components/loaders/Loader';
import './background-image.scss';

export interface BackgroundImageProps {
  url: string;
  opacity?: number | string;
  blur?: string;
  position?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler;
  objectFit?: string;
}

export const BackgroundImage = (props: BackgroundImageProps) => {
  const {
    url,
    opacity = 0.1,
    blur = '4px',
    position = 'absolute',
    style,
    objectFit = 'cover',
    ...rest
  } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  const styles = {
    opacity: isLoaded ? opacity : 0.5,
    position,
    filter: isLoaded ? `blur(${blur})` : 'unset',
    ...style
  } as CSSProperties;

  const onLoad = useCallback(() => setIsLoaded(true), []);

  return (
    <div className='background-image-container' style={styles} {...rest}>
      <Image
        src={url}
        loader={<Loader style={{ paddingTop: '5rem' }} />}
        onLoad={onLoad}
        draggable={false}
        objectFit={objectFit as any}
      />
    </div>
  );
};
