import type { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ReduxProvider } from "./ReduxProvider";
import ErrorFallback from "../../components/ErrorFallback";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        // Log error to monitoring service (e.g., Sentry, LogRocket)
        console.error("Application Error:", error, errorInfo);

        // You can also send to error reporting service
        // errorReportingService.captureException(error, { extra: errorInfo });
      }}
      onReset={() => {
        // Clear any cached data or reset app state if needed
        window.location.reload();
      }}
    >
      <ReduxProvider>{children}</ReduxProvider>
    </ErrorBoundary>
  );
};
