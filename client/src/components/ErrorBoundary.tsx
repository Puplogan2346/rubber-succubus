import { RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Last-resort crash screen, styled to match the site. Visitors get a
 * friendly message and a reload button; the raw error stays tucked inside
 * a collapsed details block for debugging instead of splashing a stack
 * trace across the page.
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-black text-cream relative overflow-hidden px-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-900/5 rounded-full blur-[100px]" />

          <div className="relative z-10 text-center max-w-md w-full">
            <div className="mb-8 flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-800 to-red-950 rounded-full flex items-center justify-center border border-red-700/60">
                <span className="text-3xl font-serif italic text-red-200">R</span>
              </div>
            </div>

            <h1 className="text-2xl font-serif italic mb-3">Something snapped</h1>
            <p className="text-cream/50 text-sm mb-8 leading-relaxed">
              An unexpected error interrupted the show. Reload the page and it
              should behave itself.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="btn-sheen inline-flex items-center gap-2 bg-red-700 hover:bg-red-600 text-white px-8 py-3 rounded-sm uppercase tracking-wider font-semibold text-sm transition-colors cursor-pointer"
            >
              <RotateCcw size={16} />
              Reload Page
            </button>

            {this.state.error?.stack && (
              <details className="mt-10 text-left">
                <summary className="text-xs uppercase tracking-widest text-cream/30 hover:text-cream/50 cursor-pointer transition-colors">
                  Technical details
                </summary>
                <pre className="mt-3 p-4 rounded-sm bg-white/5 border border-red-900/20 overflow-auto max-h-64 text-xs text-cream/50 whitespace-break-spaces">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
