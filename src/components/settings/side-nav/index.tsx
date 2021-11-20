import { SideNavMainSection } from './main-section';
import './side-nav.scss';

export const SideNav = () => {
  return (
    <aside className="side-nav">
      <nav>
        <ul className="side-nav-items">
          <SideNavMainSection />
        </ul>
      </nav>
    </aside>
  );
};
