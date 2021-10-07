import { Avatar, Heading, Input } from '@maeek/neutrino-design';
import { ReactNode, UIEventHandler, useRef, useState } from 'react';
import { ImageChangePreview } from './preview';
import { ImageChangeHeader } from './header';
import { ImageChangeFooter } from './footer';
import { InputRef } from '@maeek/neutrino-design/components/atoms/inputs/text/Input';
import Loader from '@maeek/neutrino-design/components/molecules/loaders/Loader';
import './image-change.scss';

const testArr = [
  'https://static.suchanecki.me/pepe1.jpg',
  'https://static.suchanecki.me/nasa.jpg',
  'https://static.suchanecki.me/avatar.png',
  'https://static.suchanecki.me/neony_1080p.jpg',
  'https://static.suchanecki.me/tape1.jpg',
  'https://static.suchanecki.me/tape2.jpg',
  'https://static.suchanecki.me/tape3.jpg',
  'https://static.suchanecki.me/twist.jpg',
  'https://static.suchanecki.me/youth.jpg',
  'https://static.suchanecki.me/yosemite.jpg',
  'https://static.suchanecki.me/jupiter.jpg'
];

export interface GalleryItem {
  url: string;
}

export interface ImageChangeProps {
  /**
   * Modal title
   */
  title?: string | ReactNode;
  /**
   * Modal description
   */
  description?: string | ReactNode;
  /**
   * Current image url
   */
  url?: string;
  /**
   * Can the image be removed entirely
   */
  canBeRemoved?: boolean;
  forceAspectRatio?: '1-1';
  mimeTypesAllowed?: 'image/*' | string[];
  gallery?: GalleryItem[];
  onUpdate?: (image: string) => string | undefined | void;
  onCancel?: () => void;
}

const SCROLL_POINT = 50;

export const ImageChange = ({
  url,
  title = 'Change image',
  description = 'You can drop files into the preview or paste URL in the input.',
  onUpdate,
  onCancel,
  gallery,
  forceAspectRatio
}: ImageChangeProps) => {
  const [ originalImg ] = useState(url);
  const [ currentImg, setCurrentImg ] = useState(url || '');
  const [ isShowMore, setIsShowMore ] = useState(false);
  const [ isScrolled, setIsScrolled ] = useState(() => {
    const elem = document.querySelector('.image-change-container') || {} as HTMLElement;
    return elem?.scrollTop > SCROLL_POINT;
  });
  const imgRef = useRef<InputRef>(null);
  const savingIsBlocked = currentImg === originalImg;

  const onUpdateHandler = () => {
    if (onUpdate && !savingIsBlocked) {
      onUpdate(currentImg);
    }

    return currentImg;
  };

  const onScrollHandler: UIEventHandler = (e) => {
    if ((e.target as HTMLElement).scrollTop > SCROLL_POINT) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  return (
    <section className="image-change-wrapper">
      <div className="image-change-container" onScroll={onScrollHandler}>
        <ImageChangeHeader
          title={title}
          description={description}
          onClose={onCancel}
          compact={isScrolled}
        />
        <div className="image-change-content">
          <ImageChangePreview
            url={currentImg}
            onClear={() => imgRef?.current?.setValue('')}
            forceAspectRatio={forceAspectRatio}
          />
          <Input
            renderLabel="Image URL"
            className="image-change-url"
            ref={imgRef}
            value={currentImg}
            onChange={(value: string) => setCurrentImg(value)}
          />
          {
            (gallery || [ '' ]).length > 0
              ? (
                <>
                  <Heading className="image-change-gallery-header" level={4}>Recent images gallery</Heading>
                  <ul className="image-change-gallery-items">
                    {
                      testArr.slice(0, 5).map((itemImg: string) => (
                        <li
                          className="image-change-gallery-items-item"
                          key={itemImg}
                          onClick={() => imgRef?.current?.setValue(itemImg)}
                          onContextMenu={(e) => e.preventDefault()}
                        >
                          <Avatar selectable loader={<Loader />} size="larger" type="rounded" src={itemImg} />
                        </li>
                      ))
                    }
                    {
                      testArr.slice(5).length > 0 && !isShowMore
                        ? (
                          <li
                            className="image-change-gallery-items-item image-change-gallery-items-item--more"
                            onContextMenu={(e) => e.preventDefault()}
                            onClick={() => setIsShowMore(true)}
                          >
                            Show More ({ testArr.slice(5).length })
                          </li>
                        )
                        : null
                    }
                    {
                      isShowMore && testArr.slice(5).map((itemImg: string) => (
                        <li
                          className="image-change-gallery-items-item"
                          key={itemImg}
                          onClick={() => imgRef?.current?.setValue(itemImg)}
                          onContextMenu={(e) => e.preventDefault()}
                        >
                          <Avatar loader={<Loader />} size="larger" type="rounded" src={itemImg} selectable />
                        </li>
                      ))
                    }
                    {
                      isShowMore
                        ? (
                          <li
                            className="image-change-gallery-items-item image-change-gallery-items-item--more"
                            onContextMenu={(e) => e.preventDefault()}
                            onClick={() => setIsShowMore(false)}
                          >
                            Show Less
                          </li>
                        )
                        : null
                    }
                  </ul>
                </>
              )
              : null
          }
        </div>
        <ImageChangeFooter
          isUpdateButtonDisabled={savingIsBlocked}
          onCancel={onCancel}
          onUpdate={onUpdateHandler}
        />
      </div>
    </section>
  );
};
