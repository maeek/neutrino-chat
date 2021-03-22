import { FC } from 'react';
import { RouteProps } from 'react-router-dom';
import LayoutContentFooter from '@maeek/neutrino-design/components/layouts/content-footer';
import GenericFooter from '@components/common/footer/generic';
import './styles/main.scss';
interface MainViewProps extends RouteProps {
  [key: string]: any;
}

export const MainView: FC<MainViewProps> = () => {
  const footerNode = <GenericFooter />;

  return (
    <div className="view-root view-root--main">
      <LayoutContentFooter footerNode={footerNode}>
        Yee
      </LayoutContentFooter>
    </div>
  );
};

export default MainView;
