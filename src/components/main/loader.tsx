import { FC } from 'react';
import Loader from '@maeek/neutrino-design/components/molecules/loaders/Loader';
import TopBar from '../common/top-bar';
import './styles/loader.scss';

export const MainViewLoader: FC = () => {
  return (
    <div className="view-root view-root--main">
      <TopBar />
      <Loader />
    </div>
  );
};

export default MainViewLoader;
