import { FC, memo } from 'react';
import { useHistory } from 'react-router-dom';
import { Heading } from '@maeek/neutrino-design/components/atoms/typography/heading';
import { Text } from '@maeek/neutrino-design/components/atoms/typography/text';
import NavController from '../../../utils/navigation';
import NavigationControlls from '../navigation-controlls/navigation';
import './styles/top-bar.scss';

export interface TopBarProps {
  [key: string]: any;
}

export const TopBar: FC<TopBarProps> = () => {
  const history = useHistory();

  const onHeadingClick = (e: MouseEvent) => {
    e.preventDefault();
    NavController.forward(history, '/');
  };

  return (
    <nav className="top-bar">
      <NavigationControlls />
      <div className="top-bar-inner">
        <Heading level={1} className="top-bar-heading">
          <Text type="primary" link={process.env.PUBLIC_URL} onClick={onHeadingClick}>Neutrino Chat</Text>
        </Heading>
      </div>
    </nav>
  );
};

export default memo(TopBar) ;
