import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
import BuggyComponent from "./components/BuggyComponent";

function App() {
  return (
    <>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={(error, errorInfo) => {
          console.error("Error caught by boundary:", error, errorInfo);
        }}
        onReset={() => window.location.reload()}
      >
        <div className="min-h-screen p-8 space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              React Error Boundary Demo
            </h1>
            <p className="text-gray-600">
              Click the button below to simulate a component crash
            </p>
          </div>
          <></>
          <div className="max-w-md mx-auto">
            <BuggyComponent />
          </div>

          <div className="text-center">
            <div className="text-chart-5 border-2 border-amber-400 text-5xl w-full flex justify-center items-center p-8">
              <button className="border-2 px-20 rounded-md py-6 border-red-300">
                Hello lava
              </button>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}

export default App;
