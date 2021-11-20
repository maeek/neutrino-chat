import { ReactNode, Suspense, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import LayoutSideContent from '@maeek/neutrino-design/components/layouts/side-content';
import { SideNav } from './side-nav';
import { setTopBarVisibility } from '@/store/app/ui/actions';
import { useMediaQuery } from 'react-responsive';
import './settings.scss';

export interface SettingsViewProps {
  children?: ReactNode;
}

export const SettingsView = ({ children }: SettingsViewProps) => {
  const isMobile = useMediaQuery({ maxWidth: 786 });
  const dispatch = useDispatch();
  
  useLayoutEffect(() => {
    if (!isMobile) return;

    dispatch(setTopBarVisibility(true));
    
    return () => {
      dispatch(setTopBarVisibility(false));
    };
  }, [ dispatch, isMobile ]);

  const sideNode = !isMobile ? <SideNav /> : null;

  return (
    <div className="view-root view-root--settings">
      <LayoutSideContent className="main-side-filter" hideScroll sideNode={sideNode}>
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </LayoutSideContent>
    </div>
  );
};

export default SettingsView;
