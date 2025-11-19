import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import { ToastProvider, useToast } from './contexts/ToastContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage, SignupPage, DashboardPage } from './pages';
import { setToastError } from './services/api';

// Component to register toast error function with API interceptor
function ApiErrorHandler() {
  const { showError } = useToast();

  useEffect(() => {
    setToastError(showError);
  }, [showError]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <ApiErrorHandler />
        {/* Skip to main content link for keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <AuthProvider>
          <TaskProvider>
            <Routes>
              {/* Redirect root to login */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* Public routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              {/* Protected routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks/all"
                element={
                  <ProtectedRoute>
                    <DashboardPage filter="all" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks/pending"
                element={
                  <ProtectedRoute>
                    <DashboardPage filter="pending" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks/in-progress"
                element={
                  <ProtectedRoute>
                    <DashboardPage filter="in-progress" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks/completed"
                element={
                  <ProtectedRoute>
                    <DashboardPage filter="completed" />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </TaskProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
