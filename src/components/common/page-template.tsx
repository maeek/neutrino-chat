import { Component, ReactNode, Suspense } from 'react';
import NoNetworkBanner from '@/components/common/no-network-banner';
import classNames from 'classnames';

interface PageTemplateProps {
  startFromTop?: boolean;
  children?: ReactNode;
  errorPage?: ReactNode | ((stack: string) => ReactNode);
  fallbackComponent?: ReactNode;
  offlineFallbackComponent?: ReactNode;
  canOperateOffline: boolean;
  title?: string;
  className?: string;
}

interface PageTemplateState {
  hasError: boolean;
  errorMessage: string;
  stack: string;
}

export class PageTemplate extends Component<PageTemplateProps, PageTemplateState> {
  constructor(props: PageTemplateProps) {
    super(props);

    this.state = {
      hasError: false,
      errorMessage: '',
      stack: ''
    };
  }

  componentDidMount() {
    if (this.props.title) {
      document.title = this.props.title;
    }

    if (this.props.startFromTop) {
      document.scrollingElement?.scrollTo({
        top: 0,
        behavior: 'auto'
      });
    }
  }

  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
      errorMessage: error.message || '',
      stack: error.stack
    };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Application encountered unexpected error');
    console.error(error, errorInfo);
  }

  render() {
    const {
      fallbackComponent,
      offlineFallbackComponent,
      canOperateOffline
    } = this.props;

    if (this.state.hasError) {
      const errorNode = typeof this.props.errorPage === 'function' 
        ? this.props.errorPage(this.state.errorMessage)
        : this.props.errorPage;

      return (
        <main className="page-root page-root--error">
          {
            errorNode || this.state.errorMessage
          }
        </main>
      );
    }

    const contentNode = (
      <main className={classNames("page-root", this.props.className)}>
        {
          this.props.children
        }
      </main>
    );

    return (
      <Suspense fallback={fallbackComponent || null}>
        {
          !canOperateOffline && <NoNetworkBanner>{offlineFallbackComponent}</NoNetworkBanner>
        }
        {contentNode}
      </Suspense>
    );
  }
}
