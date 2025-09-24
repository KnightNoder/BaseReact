import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Home, RefreshCw } from "lucide-react";

export const RouteErrorBoundary = () => {
  const error = useRouteError();

  let errorMessage: string;
  let errorStatus: number | undefined;

  if (isRouteErrorResponse(error)) {
    errorMessage =
      error.data?.message || error.statusText || "An error occurred";
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    errorMessage = "Unknown error occurred";
  }

  const getErrorTitle = (status?: number) => {
    switch (status) {
      case 404:
        return "Sorry, this page isn't available.";
      case 403:
        return "Access Forbidden";
      case 500:
        return "Server Error";
      default:
        return "Something went wrong";
    }
  };

  const getErrorDescription = (status?: number) => {
    switch (status) {
      case 404:
        return "The link you followed may be broken, or the page may have been removed.";
      case 403:
        return "You don't have permission to access this resource.";
      case 500:
        return "Our servers are experiencing issues. Please try again later.";
      default:
        return "An unexpected error occurred while loading this page.";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-red-100">
            <span className="text-4xl font-bold text-red-600">
              {errorStatus || "!"}
            </span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {getErrorTitle(errorStatus)}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {getErrorDescription(errorStatus)}
          </p>
        </div>

        {/* Error details for development */}
        {import.meta.env.DEV && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-left">
            <details>
              <summary className="cursor-pointer text-sm font-medium text-gray-700">
                Technical Details
              </summary>
              <pre className="mt-2 text-xs text-red-600 whitespace-pre-wrap">
                {errorMessage}
              </pre>
            </details>
          </div>
        )}

        <div className="mt-8 space-y-4">
          <Button
            onClick={() => window.location.reload()}
            className="w-full flex items-center justify-center"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>

          <Button
            variant="outline"
            onClick={() => (window.location.href = "/dashboard")}
            className="w-full flex items-center justify-center"
          >
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};
