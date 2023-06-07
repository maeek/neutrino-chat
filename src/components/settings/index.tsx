import { ReactNode, Suspense } from 'react';
import LayoutSideContent from '@maeek/neutrino-design/components/layouts/side-content';
import { SideNav } from './side-nav';
import { useMediaQuery } from 'react-responsive';
import './settings.scss';

export interface SettingsViewProps {
  children?: ReactNode;
}

export const SettingsView = ({ children }: SettingsViewProps) => {
  const isMobile = useMediaQuery({ maxWidth: 786 });
  
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
