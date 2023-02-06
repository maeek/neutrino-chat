import { memo, useState } from 'react';
import { SendRounded } from '@material-ui/icons';
import {
  ContextMenu,
  ContextMenuItems,
  ContextMenuProps
} from '@maeek/neutrino-design/components/context-menu/Menu';
import './context-menu-wrapper.scss';

export interface MainSearchBarAddButtonContextMenuProps
  extends ContextMenuProps {
  closeContextMenu?: any;
}

export const MainSearchBarAddButtonContextMenu = (
  props: MainSearchBarAddButtonContextMenuProps
) => {
  const [items] = useState<ContextMenuItems[]>([
    {
      text: 'Compose Message',
      icon: <SendRounded />,
      iconPosition: 'left',
      closeOnClick: true
    }
    // {
    //   text: 'Add Channel',
    //   icon: <GroupAddRounded />,
    //   iconPosition: 'left',
    //   closeOnClick: true
    // }
  ]);

  return <ContextMenu {...props} showMaskOnMobile items={items} />;
};

export default memo(MainSearchBarAddButtonContextMenu);
