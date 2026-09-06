import React from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("Taskor Uncaught App Error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-taskor-cloud px-4 py-12 text-center text-[var(--text)] sm:px-6 lg:px-8">
          <div className="w-full max-w-lg rounded-3xl border border-white/60 bg-white/80 p-6 shadow-card backdrop-blur-xl sm:p-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400">
              <AlertTriangle size={32} />
            </div>

            <h1 className="mt-6 text-2xl font-bold tracking-tight text-taskor-ink dark:text-white sm:text-3xl">
              Something went wrong
            </h1>

            <p className="mt-3 text-sm leading-6 text-taskor-slate">
              An unexpected error occurred while rendering this section.
            </p>

            {this.state.error && (
              <div className="mt-4 overflow-x-auto rounded-2xl bg-red-50 p-4 text-left font-mono text-xs text-red-700 dark:bg-red-950/50 dark:text-red-300">
                <p className="font-semibold">{this.state.error.toString()}</p>
                {this.state.errorInfo?.componentStack && (
                  <pre className="mt-2 max-h-40 overflow-y-auto whitespace-pre-wrap text-[11px] opacity-80">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={this.handleReset}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-btn bg-taskor-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-card transition hover:opacity-90"
              >
                <RefreshCw size={16} />
                Reload Page
              </button>
              <a
                href="/"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-btn border border-taskor-mist bg-white/60 px-5 py-2.5 text-sm font-semibold text-taskor-ink transition hover:border-taskor-purple hover:text-taskor-purple dark:bg-white/10 dark:text-white"
              >
                <Home size={16} />
                Return Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
