import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check if the user is authenticated
  const isAuthenticated = 
    localStorage.getItem('authToken') ||
    localStorage.getItem('associateToken') ||
    localStorage.getItem('managerToken') ||
    localStorage.getItem('telecallerToken') ||
    localStorage.getItem('salesExecutiveToken');

  // If not authenticated, redirect to the sign-in page
  return isAuthenticated ? children : <Navigate to="/auth/sign-in" replace />;
};

export default PrivateRoute;
