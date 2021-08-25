import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import ActionButton from '@maeek/neutrino-design/components/atoms/buttons/Action';
import {
  AddRounded
} from '@material-ui/icons';
import MainSearchBarAddButtonContextMenu from './context-menu-wrapper';
import { getMeColor } from '@/selectors/user';

export const MainSearchBarAddButton = () => {
  const [ showContext, setShowContext ] = useState(false);
  const meColor = useSelector(getMeColor);

  const toggleContext = () => setShowContext(!showContext);
  const closeContextMenu = useCallback(() => setShowContext(false), [ setShowContext ]);

  return (
    <div className="main-search-bar-add">
      <ActionButton
        type="button"
        className="main-search-bar-action main-search-bar-action--compact"
        style={{
          // @ts-ignore
          background: meColor || undefined,
          border: 'currentColor',
          color: 'currentColor'
        }}
        onClick={toggleContext}
      >
        <AddRounded
          style={{
            // @ts-ignore
            color: meColor || undefined,
            mixBlendMode: 'difference'
          }}
        />
      </ActionButton>
      {
        showContext ? <MainSearchBarAddButtonContextMenu closeContextMenu={closeContextMenu} /> : null
      }
    </div>
  );
};

export default MainSearchBarAddButton;
