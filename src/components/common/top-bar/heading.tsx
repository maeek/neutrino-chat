import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Heading } from '@maeek/neutrino-design/components/typography/heading';
import { Text } from '@maeek/neutrino-design/components/typography/text';
import Navigator from '@/utils/navigation';
import { getMeColor } from '@/selectors/user';
import './heading.scss';

export const TopBarHeading = () => {
  const history = useHistory();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const meColor = useSelector(getMeColor);

  const onHeadingClick = (e: MouseEvent) => {
    e.preventDefault();
    Navigator.forward(history, '/');
  };

  return (
    <Heading level={1} className='top-bar-heading' tabIndex={0}>
      <Text
        type='primary'
        link='/'
        onClick={onHeadingClick}
        className='top-bar-heading-colored'
        style={{ color: meColor || 'inherit' }}
      >
        {!isMobile ? 'Neutrino Chat' : 'Neutrino'}
      </Text>
    </Heading>
  );
};

export default memo(TopBarHeading);
