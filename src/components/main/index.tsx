import LayoutContentFooter from '@maeek/neutrino-design/components/layouts/content-footer';
import LayoutSideContent from '@maeek/neutrino-design/components/layouts/side-content';
import GenericFooter from '@/components/common/footer/generic';
import MainSearchBar from './search-bar/search-bar';
import UsersCards from './content/users';
import { SideNav } from './side-nav';
import './main.scss';

export const MainView = () => {
  const footerNode = <GenericFooter />;

  return (
    <div className="view-root view-root--main">
      <LayoutContentFooter footerNode={footerNode}>
        <LayoutSideContent className="main-side-filter" hideScroll sideNode={<SideNav />}>
          <MainSearchBar />
          <UsersCards />
        </LayoutSideContent>
      </LayoutContentFooter>
    </div>
  );
};

export default MainView;
