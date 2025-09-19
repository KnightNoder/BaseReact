import { useState } from "react";

function BuggyComponent() {
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    // This will throw an error and trigger the error boundary
    throw new Error("Component crashed! This is a simulated error for demonstration.");
  }

  return (
    <div className="p-4 border border-yellow-400 rounded-lg bg-yellow-50">
      <h3 className="text-lg font-semibold text-yellow-800 mb-2">
        Demo Component
      </h3>
      <p className="text-yellow-700 mb-4">
        This component can simulate an error to demonstrate error boundaries.
      </p>
      <button
        onClick={() => setShouldCrash(true)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
      >
        💥 Crash Component
      </button>
    </div>
  );
}

export default BuggyComponent;