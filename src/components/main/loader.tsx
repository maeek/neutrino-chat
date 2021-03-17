import { FC } from 'react';
import Loader from '@maeek/neutrino-design/components/molecules/loaders/Loader';
import './styles/loader.scss';

export const MainViewLoader: FC = () => {
  return (
    <div className="view-root view-root--main">
      <Loader />
    </div>
  );
};

export default MainViewLoader;
