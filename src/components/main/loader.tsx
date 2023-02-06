import Loader from '@maeek/neutrino-design/components/loaders/Loader';
import './loader.scss';

export const MainViewLoader = () => {
  return (
    <div className='view-root view-root--main view-root--main-loader'>
      <Loader />
    </div>
  );
};

export default MainViewLoader;
