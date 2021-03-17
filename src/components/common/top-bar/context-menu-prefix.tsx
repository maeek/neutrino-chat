import { FC, memo } from 'react';
import { Text } from '@maeek/neutrino-design/components/atoms/typography/text';
import { useHistory } from 'react-router';
import Navigator from '../../../utils/navigation';
import './styles/top-bar.scss';

export interface ContextMenuPrefixProps {
  [key: string]: any;
}

export const ContextMenuPrefix: FC<ContextMenuPrefixProps> = (props) => {
  const history = useHistory();
  const goToProfile = () => Navigator.forward(history, '/profile');

  return (
    <div className="top-bar-badge-wrapper-context-menu-prefix-content">
      <Text className="prefix-username" onClick={goToProfile}>maek</Text>
      <Text type="success" className="prefix-status"><span className="dot"></span>Active</Text>
    </div>
  );
};

export default memo(ContextMenuPrefix);
