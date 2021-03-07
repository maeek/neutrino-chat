import { Component, ReactNode, Suspense } from 'react';
import { createPortal } from 'react-dom';

interface PageTemplateProps {
  children?: ReactNode;
  errorPage?: ReactNode | ((stack: string) => ReactNode);
  fallbackComponent?: ReactNode;
  title?: string;
}

interface PageTemplateState {
  hasError: boolean;
  errorMessage: string;
  stack: string;
}

export class PageTemplate extends Component<PageTemplateProps, PageTemplateState> {
  modalDOMNode: Element;

  constructor(props: PageTemplateProps) {
    super(props);

    this.state = {
      hasError: false,
      errorMessage: '',
      stack: ''
    };

    this.modalDOMNode = document.querySelector('#modal-root') as Element;
  }

  componentDidMount() {
    if (this.props.title) {
      document.title = this.props.title;
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
    if (this.state.hasError) {
      return createPortal(this.props.errorPage, this.modalDOMNode);
    }

    return (
      <Suspense fallback={this.props.fallbackComponent || null}>
        <main className="page-root">
          {
            this.props.children
          }
        </main>
      </Suspense>
    );
  }
}
