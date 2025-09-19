import { type FallbackProps } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="text-center p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl max-w-lg border border-white/20">
        {/* Icon */}
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>

        {/* Main content */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Houston, we have a problem!
        </h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Don't worry, it's not you—it's us. Our app had a small hiccup and crashed.
          We've been notified and are looking into it.
        </p>

        {/* Error details */}
        <details className="mb-6 text-left bg-gray-50 rounded-lg p-4 border">
          <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Technical Details
          </summary>
          <div className="mt-3 p-3 bg-gray-900 rounded-md">
            <pre className="text-xs text-green-400 font-mono overflow-auto">
              {error.message}
            </pre>
          </div>
        </details>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => {
              resetErrorBoundary();
            }}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            ✨ Try Again
          </button>

          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded-xl transition-colors border border-gray-200"
          >
            🔄 Refresh Page
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            If this keeps happening, please{" "}
            <a href="mailto:support@example.com" className="text-blue-600 hover:text-blue-700 underline">
              contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ErrorFallback;