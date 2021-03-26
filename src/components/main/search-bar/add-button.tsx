import { FC, useCallback, useState } from 'react';
import ActionButton from '@maeek/neutrino-design/components/atoms/buttons/Action';
import {
  AddRounded
} from '@material-ui/icons';
import MainSearchBarAddButtonContextMenu from './context-menu-wrapper';
import '../styles/search-bar.scss';

export interface MainSearchBarAddButtonProps {
  [key: string]: any;
}

export const MainSearchBarAddButton: FC<MainSearchBarAddButtonProps> = (props) => {
  const [showContext, setShowContext] = useState(false);

  const toggleContext = () => setShowContext(!showContext);
  const closeContextMenu = useCallback(() => setShowContext(false), [setShowContext]);

  return (
    <div className="main-search-bar-add">
      <ActionButton className="main-search-bar-action main-search-bar-action--compact" onClick={toggleContext}>
        <AddRounded />
      </ActionButton>
      <MainSearchBarAddButtonContextMenu className={showContext ? '' : 'hidden'} closeContextMenu={closeContextMenu} />
    </div>
  );
};

export default MainSearchBarAddButton;
