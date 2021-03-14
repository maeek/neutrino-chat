import LayoutTopContentFooter from '@maeek/neutrino-design/components/layouts/top-content-footer';
import { FC } from 'react';
import { RouteProps } from 'react-router-dom';
import { GenericFooter } from '../common/footer/generic';
import TopBar from '../common/top-bar';
import './styles/main.scss';
interface MainViewProps extends RouteProps {
  isAuthenticated?: boolean;
  [key: string]: any;
}

export const MainView: FC<MainViewProps> = (props) => {
  return (
    <div className="view-root view-root--main">
      <LayoutTopContentFooter topNode={<TopBar />} footerNode={<GenericFooter />}>
        Yee
      </LayoutTopContentFooter>
    </div>
  );
};

export default MainView;
