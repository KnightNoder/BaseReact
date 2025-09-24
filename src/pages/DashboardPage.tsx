import { useState } from "react";
import { useAuth } from "../features/auth/hooks/useAuth";
import { Button } from "../components/ui/button";
import { LogOut, User, Settings, Bell, BarChart3, Bug } from "lucide-react";

// Component to test error boundaries
const ErrorTestComponent = ({ shouldError }: { shouldError: boolean }) => {
  if (shouldError) {
    throw new Error("This is a test error to demonstrate error boundaries!");
  }
  return <div>No error here! 😊</div>;
};

export const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [triggerError, setTriggerError] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Welcome back, {user?.firstName || user?.username}!
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    You're successfully logged in to your dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Info Cards */}
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Profile Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <User className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Profile Information
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <div>
                          <strong>Username:</strong> {user?.username}
                        </div>
                        <div>
                          <strong>Email:</strong> {user?.email}
                        </div>
                        {user?.firstName && (
                          <div>
                            <strong>Name:</strong> {user.firstName}{" "}
                            {user?.lastName}
                          </div>
                        )}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BarChart3 className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Account Status
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <div className="flex items-center">
                          <div className="h-2 w-2 bg-green-400 rounded-full mr-2"></div>
                          Active
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          Last login: {new Date().toLocaleDateString()}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Settings className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Quick Actions
                      </dt>
                      <dd className="mt-2 space-y-2">
                        <Button variant="outline" size="sm" className="w-full">
                          Update Profile
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          Change Password
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="w-full"
                          onClick={() => setTriggerError(true)}
                        >
                          <Bug className="mr-2 h-4 w-4" />
                          Test Error Boundary
                        </Button>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="text-center py-12">
                <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-sm font-medium text-gray-900">
                  No recent activity
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Your activity will appear here once you start using the
                  application.
                </p>

                {/* Error Test Component */}
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <h4 className="text-sm font-medium text-yellow-800 mb-2">
                    Error Boundary Test
                  </h4>
                  <ErrorTestComponent shouldError={triggerError} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
