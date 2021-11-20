import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserById } from '@/selectors/users';
import Navigator from '@/utils/navigation';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { UserCard } from './user-card/card';
import './row.scss';

export interface MainListRowProps {
  id: string;
  style?: any;
  isScrolling?: boolean;
  measure?: () => void;
}

export const MainListRow = ({ id, style, measure, isScrolling }: MainListRowProps) => {
  const user = useSelector(getUserById(id));
  const history = useHistory();

  const handleClick = () => {
    Navigator.forward(history, `/u/${user.id}`, {
      isChat: true
    });
  };

  useEffect(() => {
    if (!measure) return;
    return measure();
  }, [ measure ]);

  return (
    <div
      className={classNames('main-list-cell', isScrolling && 'main-list-cell--scrolling')}
      onClick={handleClick}
      style={style}
      tabIndex={0}
    >
      <UserCard key={id} id={id} />
    </div>
  );
};

export default MainListRow;
