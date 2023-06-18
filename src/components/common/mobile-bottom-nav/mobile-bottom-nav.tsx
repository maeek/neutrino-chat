import {
  createRef,
  CSSProperties,
  forwardRef,
  MouseEventHandler,
  MutableRefObject,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback
} from 'react';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import Navigator from '@/utils/navigation';
import { ChatBubbleRounded, AccountCircleRounded } from '@material-ui/icons';
import { isAppUIMobileBottonNavHidden } from '@/selectors/app-ui';
import { Text } from '@maeek/neutrino-design/components/typography/text';
import './mobile-bottom-nav.scss';

export const MobileBottomNav = () => {
  const location = useLocation();
  const history = useHistory();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [ position, setPosition ] = useState<number | null>(null);
  const refs = useRef<MutableRefObject<HTMLDivElement>[]>([]);
  const isHidden = useSelector(isAppUIMobileBottonNavHidden);
  const { pathname } = location;

  const navConfig = useMemo(
    () => [
      { link: '/', name: 'Chats', icon: <ChatBubbleRounded /> },
      { link: '/me', name: 'Profile', icon: <AccountCircleRounded /> }
    ],
    []
  );
  const isAnyActive = navConfig.findIndex((c) => c.link === pathname) > -1;

  const onClick =
    (link?: string): MouseEventHandler =>
      (e) => {
        e.preventDefault();
        Navigator.forward(history, link || '');
      };

  const buttons = navConfig.map(({ name, link, icon }, i) => {
    refs.current[ i ] = refs.current[ i ] || createRef();

    return (
      <MobileBottomNavButton
        ref={refs.current[ i ]}
        key={link}
        onClick={onClick}
        link={link}
        renderIcon={icon}
      >
        <span>{name}</span>
      </MobileBottomNavButton>
    );
  });

  const positionThumb = useCallback(() => {
    const path = location.pathname.substr(1).split('/');
    const btnIndex = navConfig.findIndex((conf) => {
      return path[ 0 ] === conf.link.substr(1);
    });

    if (!refs.current[ btnIndex ]?.current) return;

    const btn = refs.current[ btnIndex ].current;
    const { left } = btn.getBoundingClientRect();

    setPosition(left);
  }, [ location.pathname, navConfig ]);

  useEffect(() => {
    if (!isMobile) return;

    positionThumb();

    window.addEventListener('resize', positionThumb);
    return () => {
      window.removeEventListener('resize', positionThumb);
    };
  }, [ isMobile, positionThumb ]);

  return isMobile ? (
    <nav
      className={classnames('bottom-nav', !isHidden && 'bottom-nav--visible')}
      onContextMenu={(e) => e.preventDefault()}
    >
      {buttons}
      {isAnyActive && position !== null ? (
        <div
          className='bottom-nav-slider'
          style={
            {
              '--pos': `${position}px`,
              '--elem-count': `${100 / navConfig.length}vw`
            } as CSSProperties
          }
        />
      ) : null}
    </nav>
  ) : null;
};

interface MobileBottomNavButtonProps {
  children?: ReactNode;
  onClick: (link?: string) => MouseEventHandler;
  link?: string;
  renderIcon?: ReactNode | ((isActivr: boolean) => ReactNode);
}

const MobileBottomNavButton = forwardRef<
  HTMLDivElement,
  MobileBottomNavButtonProps
>(({ children, link, onClick, renderIcon }, ref) => {
  const location = useLocation();
  const { pathname } = location;
  const isActive = pathname === link;

  return (
    <div
      ref={ref}
      className={classnames(
        'bottom-nav-button',
        isActive && 'bottom-nav-button--active'
      )}
    >
      <Text strong={isActive} link={link} onClick={onClick(link)}>
        {typeof renderIcon === 'function' ? renderIcon(isActive) : renderIcon}
        {children}
      </Text>
    </div>
  );
});
