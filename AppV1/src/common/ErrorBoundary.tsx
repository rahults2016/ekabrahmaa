import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Frown } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-ivory p-4">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-pink-light/20 flex items-center justify-center mx-auto mb-4">
              <Frown size={32} className="text-pink" />
            </div>
            <h2 className="text-2xl font-garamond font-semibold mb-2">
              Something went wrong
            </h2>
            <p className="text-charcoal-light mb-6">
              We apologize for the inconvenience. Please try again.
            </p>
            <button
              onClick={this.handleRetry}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;