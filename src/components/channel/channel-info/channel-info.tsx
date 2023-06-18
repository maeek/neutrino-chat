import classNames from 'classnames';
import UsernameFull from '../../common/user-components/username-full';
import DetailsButtonShowMore from '../details-buttons/details-more';
import ArrowBackRounded from '@material-ui/icons/ArrowBackRounded';
import { useDispatch, useSelector } from 'react-redux';
import Navigator from '@/utils/navigation';
import { useHistory } from 'react-router-dom';
import './channel-info.scss';
import { getMeUsername } from '@/selectors/user';
import { Channel } from '@/store/channels/types';

export interface UserInfoProps {
  isMinified?: boolean;
  onToggle?: () => void;
  channel: Channel;
}

export const ChannelInfo = ({
  channel,
  isMinified,
  onToggle
}: UserInfoProps) => {
  const history = useHistory();

  const goBack = () => Navigator.forward(history, '/');

  const backNode = isMinified ? (
    <div className='user-info-back' onClick={goBack}>
      <ArrowBackRounded />
    </div>
  ) : null;

  return (
    <>
      <div
        className={classNames('user-info', isMinified && 'user-info--minified')}
      >
        <div className='user-info-container'>
          {backNode}

          <UsernameFull id={channel.name} />
        </div>
        <DetailsButtonShowMore
          isVisible={isMinified}
          onClick={() => Navigator.forward(history, `/c/${channel.name}`)}
        />
      </div>
    </>
  );
};

export default ChannelInfo;
