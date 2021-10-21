import LayoutContentFooter from '@maeek/neutrino-design/components/layouts/content-footer';
import MainSearchBar from '../common/search-bar/search-bar';
import UsersCards from './content/users';
import './chats.scss';

export const ChatsView = () => {

  return (
    <div className="view-root view-root--chats">
      <LayoutContentFooter footerNode={null} >
        <MainSearchBar />
        <UsersCards />
      </LayoutContentFooter>
    </div>
  );
};

export default ChatsView;
