import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/ProtectedRoute";

function ErrorTrigger() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error(
      "This is a test error to demonstrate error boundary functionality!",
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white py-8 px-6 shadow-md rounded-lg">
          <div className="text-center space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Error Testing Page
            </h1>
            <p className="text-gray-600">
              This page is for testing error boundary functionality. Click the
              button below to trigger an error.
            </p>
            <Button onClick={() => setShouldThrow(true)} variant="destructive">
              Trigger Error
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestErrorPage() {
  return (
    <ProtectedRoute>
      <ErrorTrigger />
    </ProtectedRoute>
  );
}
