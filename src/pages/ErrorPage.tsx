import { useRouteError, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface RouteError {
  statusText?: string;
  message?: string;
  status?: number;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/dashboard");
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-24 w-24 text-red-500">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className="w-full h-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Oops! Something went wrong
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            We encountered an unexpected error. Don't worry, our team has been
            notified.
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-md rounded-lg">
          <div className="space-y-4">
            {error?.status && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Error {error.status}
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      {error.statusText ||
                        error.message ||
                        "An unexpected error occurred"}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center space-y-4">
              <p className="text-gray-600">
                You can try refreshing the page or go back to the dashboard.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={handleReload}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Reload Page
                </Button>

                <Button onClick={handleGoHome} className="w-full sm:w-auto">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Go to Dashboard
                </Button>
              </div>
            </div>

            <div className="text-center pt-4 border-t">
              <p className="text-xs text-gray-500">
                If the problem persists, please contact our support team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
