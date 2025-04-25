import React from "react";

// services/errorLogging.ts
export const logError = (error: Error, context?: Record<string, unknown>) => {
    console.error('Application Error:', error, context);
  };
  
  // Enhanced error boundary
  export class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, { hasError: boolean }> {
    state = { hasError: false };
  
    static getDerivedStateFromError() {
      return { hasError: true };
    }
  
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      logError(error, { errorInfo });
    }
  
    render() {
      if (this.state.hasError) {
        return (
          <div className="p-4 bg-red-100 text-red-700">
            <h2>Something went wrong</h2>
            <button 
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => window.location.reload()}
            >
              Reload Application
            </button>
          </div>
        );
      }
      return this.props.children;
    }
  }