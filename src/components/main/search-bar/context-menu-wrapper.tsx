import { FC, memo } from 'react';
import {
  PersonAddRounded,
  AddCommentRounded,
  GroupAddRounded
} from '@material-ui/icons';
import { ContextMenu, ContextMenuItems } from '@maeek/neutrino-design/components/molecules/context-menu/Menu';
import '../styles/search-bar.scss';

export interface MainSearchBarAddButtonContextMenuProps {
  closeContextMenu?: any;
  [key: string]: any;
}

export const MainSearchBarAddButtonContextMenu: FC<MainSearchBarAddButtonContextMenuProps> = (props) => {
  const items: ContextMenuItems[] = [
    {
      text: 'Add Contact',
      icon: <PersonAddRounded />,
      iconPosition: 'left',
      closeOnClick: true
    },
    {
      text: 'Add Direct Message',
      icon: <AddCommentRounded />,
      iconPosition: 'left',
      closeOnClick: true
    },
    {
      text: 'Add Channel',
      icon: <GroupAddRounded />,
      iconPosition: 'left',
      closeOnClick: true
    }
  ];

  return <ContextMenu items={items} {...props} />;
};

export default memo(MainSearchBarAddButtonContextMenu);
