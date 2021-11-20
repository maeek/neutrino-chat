import { ReactNode } from 'react';
import { Heading } from '@maeek/neutrino-design';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { ArrowBackRounded } from '@material-ui/icons';
import Navigator from '@/utils/navigation';
import { useHistory } from 'react-router-dom';
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
  
  const navBack = () => {
    Navigator.back(history, '/me');
  };

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
