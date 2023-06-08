import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Heading } from '@maeek/neutrino-design/components/typography/heading';
import { Text } from '@maeek/neutrino-design/components/typography/text';
import Navigator from '@/utils/navigation';
import { getMeColor } from '@/selectors/user';
import { ForumRounded } from '@material-ui/icons';
import './heading.scss';

export const TopBarHeading = () => {
  const history = useHistory();
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
        <ForumRounded />
        Chat
      </Text>
    </Heading>
  );
};

export default memo(TopBarHeading);
