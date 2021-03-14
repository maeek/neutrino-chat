import { FC } from 'react';
import Loader from '@maeek/neutrino-design/components/molecules/loaders/Loader';
import NavigationTopBar from '../common/navigation-top-bar';
import './styles/loader.scss';

export const MainViewLoader: FC = () => {
  return (
    <div className="view-root view-root--main">
      <NavigationTopBar />
      <Loader />
    </div>
  );
};

export default MainViewLoader;
