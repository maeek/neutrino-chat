import { FC, memo } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { Text } from '@maeek/neutrino-design/components/atoms/typography/text';
import Navigator from '@utils/navigation';
import { getMeUsername } from '@store/me/user/selectors';
import '../styles/top-bar.scss';

export interface ContextMenuPrefixProps {
  [key: string]: any;
}

export const ContextMenuPrefix: FC<ContextMenuPrefixProps> = (props) => {
  const history = useHistory();
  const username = useSelector(getMeUsername);
  const goToProfile = () => Navigator.forward(history, '/me');

  return (
    <div className="top-bar-badge-wrapper-context-menu-prefix-content">
      <Text className="prefix-username" onClick={goToProfile}>{username}</Text>
      <Text type="success" className="prefix-status"><span className="dot"></span>Active</Text>
    </div>
  );
};

export default memo(ContextMenuPrefix);
