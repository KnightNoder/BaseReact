import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/organisms/ErrorBoundary';
import { ProtectedRoute } from '@/components/organisms/ProtectedRoute';
import { Login } from '@/pages/Login';
import { Signup } from '@/pages/Signup';
import { ForgotPassword } from '@/pages/ForgotPassword';
import { Movies } from '@/pages/Movies';
import { PostDetail } from '@/pages/PostDetail';
import { useAuthStore } from '@/store/authStore';
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function AppRoutes() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Routes>
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to="/movies" /> : <Navigate to="/login" />} 
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route 
        path="/movies" 
        element={
          <ProtectedRoute>
            <Movies />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/posts/:id" 
        element={
          <ProtectedRoute>
            <PostDetail />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppRoutes />
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
