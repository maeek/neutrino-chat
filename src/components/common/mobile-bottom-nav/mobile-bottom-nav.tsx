import {
  createRef,
  forwardRef,
  MouseEventHandler,
  MutableRefObject,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import classnames from 'classnames';
import { useLocation, withRouter } from 'react-router';
import { Text } from '@maeek/neutrino-design/components/atoms/typography/text';
import Navigator from '@/utils/navigation';
import { CSSProperties } from '@material-ui/styles';
import './mobile-bottom-nav.scss';

interface MobileBottomNavButtonProps {
  children?: ReactNode;
  onClick: (link?: string) => MouseEventHandler;
  link?: string;
}

export const MobileBottomNav = withRouter(({ location, history }) => {
  const [ position, setPosition ] = useState(0);
  const refs = useRef<MutableRefObject<HTMLDivElement>[]>([]);

  const navConfig = useMemo(() => [
    { link: '/', name: 'Home' },
    { link: '/chat', name: 'Chat' },
    { link: '/me', name: 'Profile' }
  ], []);

  const onClick = (link?: string): MouseEventHandler => (e) => {
    e.preventDefault();
    Navigator.forward(history, link || '');
  };

  const buttons = navConfig.map(({ name, link }, i) => {
    refs.current[ i ] = refs.current[ i ] || createRef();

    return (
      <MobileBottomNavButton ref={refs.current[ i ]} key={link} onClick={onClick} link={link}>
        {name}
      </MobileBottomNavButton>
    );
  });

  useEffect(() => {
    const btnIndex = navConfig.findIndex((conf) => conf.link === location.pathname);
    const btn = refs.current[ btnIndex ].current;
    const { left } = btn.getBoundingClientRect();

    setPosition(left);
  }, [ location.pathname, navConfig ]);

  return (
    <nav className="bottom-nav">
      {buttons}
      <div className="bottom-nav-slider" style={{ '--pos': `${position}px` } as CSSProperties} />
    </nav>
  );
});

const MobileBottomNavButton = forwardRef<HTMLDivElement, MobileBottomNavButtonProps>(({
  children,
  link,
  onClick
}, ref) => {
  const location = useLocation();
  const { pathname } = location;
  const isActive = pathname === link;

  return (
    <div
      ref={ref}
      className={classnames('bottom-nav-button', isActive && 'bottom-nav-button--active')}
    >
      <Text strong={isActive} link={link} onClick={onClick(link)}>
        {children}
      </Text>
    </div>
  );
});
