import { FC } from 'react';
import { RouteProps } from 'react-router-dom';
import LayoutContentFooter from '@maeek/neutrino-design/components/layouts/content-footer';
import LayoutSideContent from '@maeek/neutrino-design/components/layouts/side-content';
import GenericFooter from '@components/common/footer/generic';
import MainSearchBar from './search-bar/search-bar';
import './styles/main.scss';
import { Heading } from '@maeek/neutrino-design/components/atoms/typography/heading';

interface MainViewProps extends RouteProps {
  [key: string]: any;
}

export const MainView: FC<MainViewProps> = () => {
  const footerNode = <GenericFooter />;

  return (
    <div className="view-root view-root--main">
      <LayoutContentFooter footerNode={footerNode}>
        <LayoutSideContent className="main-side-filter" sideNode={<div className="nav-placeholder" />}>
          <MainSearchBar />
          <Heading level={4} className="main-side-filter-heading">Contacts</Heading>
          <div style={{margin: '0 1rem 1rem', height: '300px', width: 'auto', background: '#22262b', borderRadius: '4px'}}></div>
        </LayoutSideContent>
      </LayoutContentFooter>
    </div>
  );
};

export default MainView;
