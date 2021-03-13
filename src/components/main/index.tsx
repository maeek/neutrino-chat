import { LayoutTopContentFooter } from '@maeek/neutrino-design/components/';
import { FC, MouseEvent } from 'react';
import { RouteProps, useHistory } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import { GenericFooter } from '../common/footer/generic';
import { NavigationTopBar } from '../common/navigation-top-bar';
import './styles/main.scss';
interface MainViewProps extends RouteProps {
  isAuthenticated?: boolean;
  [key: string]: any;
}

export const MainView: FC<MainViewProps> = (props) => {
  return (
    <div className="view-root view-root--main">
      <LayoutTopContentFooter topNode={<NavigationTopBar />} footerNode={<GenericFooter />}>
        Yee
      </LayoutTopContentFooter>
    </div>
  );
};

export default MainView;
