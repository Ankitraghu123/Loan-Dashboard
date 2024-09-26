import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import initialTheme from './theme/theme';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './utils/PrivateRoute'; // Import the PrivateRoute component
import PublicRoute from 'utils/PublicRoute';

export default function Main() {
  const [currentTheme, setCurrentTheme] = useState(initialTheme);

  return (
    <ChakraProvider theme={currentTheme}>
      <Routes>
        {/* Auth routes */}
        <Route 
          path="auth/*" 
          element={
            <PublicRoute>
              <AuthLayout />
            </PublicRoute>
          } 
        />

        {/* Protected admin routes */}
        <Route
          path="admin/*"
          element={
            <PrivateRoute>
              <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
            </PrivateRoute>
          }
        />

        {/* Protected RTL routes */}
        <Route
          path="rtl/*"
          element={
            <PrivateRoute>
              <RTLLayout theme={currentTheme} setTheme={setCurrentTheme} />
            </PrivateRoute>
          }
        />

        {/* Default route */}
        <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
      </Routes>
      <ToastContainer />
    </ChakraProvider>
  );
}
