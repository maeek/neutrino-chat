import { Text } from '@maeek/neutrino-design/components/typography/text/Text';
import { MoreHorizRounded } from '@material-ui/icons';
import { MouseEventHandler } from 'react';
import './details.scss';

export interface DetailsButtonShowMoreProps {
  isVisible?: boolean;
  onClick?: MouseEventHandler;
}

export const DetailsButtonShowMore = ({
  isVisible,
  onClick
}: DetailsButtonShowMoreProps) =>
  isVisible ? (
    <Text tabIndex={0} className='user-info-thumb-minified' onClick={onClick}>
      <MoreHorizRounded />
    </Text>
  ) : null;

export default DetailsButtonShowMore;
