import { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';
import { Text } from '@maeek/neutrino-design/components/atoms/typography';
import { useConnection } from '@maeek/neutrino-design/hooks/useConnection';
import CloseRounded from '@material-ui/icons/CloseRounded';
import SignalCellularConnectedNoInternet0BarRoundedIcon from '@material-ui/icons/SignalCellularConnectedNoInternet0BarRounded';
import './index.scss';

export interface NoNetworkBannerProps {
  children?: ReactNode;
}

export const NoNetworkBanner: any = (props: NoNetworkBannerProps) => {
  const { children } = props;
  const isConnected = useConnection();
  const [isHidden, setIsHidden] = useState(false);
  const portalNode = document.querySelector('#connection-root');

  const hideNotification = () => {
    setIsHidden(true);
  };

  const defaultInfoNode = (
    <div className="no-network-dialog">
      <SignalCellularConnectedNoInternet0BarRoundedIcon className="no-network-dialog-icon" />
      <Text>
        This functionality doesn't work in <Text highlight>offline</Text>. Check your internet connection and come back to this page.
      </Text>
      <CloseRounded onClick={hideNotification} className="no-network-dialog-close" />
    </div>
  );
  const notConnectedNode = (
    <div className={classnames('no-network', isHidden && 'no-network--hidden')}>
      {
        children || defaultInfoNode
      }
    </div>
  );

  if (isConnected === false) {
    return createPortal(notConnectedNode, portalNode as any);
  }

  return <div />;
};

export default NoNetworkBanner;
