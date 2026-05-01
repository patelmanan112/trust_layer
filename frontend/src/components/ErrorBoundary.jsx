import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
          <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6">
            <FiAlertTriangle size={40} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Something went wrong.</h1>
          <p className="text-gray-500 max-w-md mb-8">We encountered an unexpected error. Please try refreshing the page or contact support if the issue persists.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-[#316C5B] text-white font-black rounded-2xl uppercase tracking-widest text-[10px] hover:bg-[#255245] transition-all"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
