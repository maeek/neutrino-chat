import { ReactNode, useLayoutEffect } from 'react';
import { Heading } from '@maeek/neutrino-design';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { ArrowBackRounded } from '@material-ui/icons';
import Navigator from '@/utils/navigation';
import { useHistory } from 'react-router-dom';
import { setMobileBottomNavVisibility } from '@/store/app/ui/actions';
import './template.scss';

export interface SettingsPageTemplateProps {
  name?: ReactNode;
  children?: ReactNode;
  headerChildren?: ReactNode;
  className?: string;
}

export const SettingsPageTemplate = ({
  children,
  name,
  headerChildren,
  className
}: SettingsPageTemplateProps) => {
  const isMobile = useMediaQuery({ maxWidth: 786 });
  const history = useHistory();
  const dispatch = useDispatch();
  
  const navBack = () => {
    Navigator.back(history, '/me');
  };

  useLayoutEffect(() => {
    if (isMobile) {
      dispatch(setMobileBottomNavVisibility(true));
    }
    
    return () => {
      dispatch(setMobileBottomNavVisibility(false));
    };
  }, [ dispatch, isMobile ]);

  return (
    <div className={classNames('settings-page-content', className)}>
      <div className="settings-page-content-header">
        <div className="settings-page-content-header-left">
          {
            isMobile
              ? (
                <span className="settings-page-content-header-back" tabIndex={0} onClick={navBack}>
                  <ArrowBackRounded />
                </span>
              ) : null
          }
          <Heading level={3}>{name}</Heading>
        </div>
        {headerChildren}
      </div>
      {children}
    </div>
  );
};

export default SettingsPageTemplate;
