import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  // Check if the user is authenticated
  const isAuthenticated = 
    localStorage.getItem('authToken') ||
    localStorage.getItem('associateToken') ||
    localStorage.getItem('managerToken') ||
    localStorage.getItem('telecallerToken') ||
    localStorage.getItem('salesExecutiveToken');

  // If authenticated, redirect to the dashboard or some other page
  return isAuthenticated ? <Navigate to="/admin/add-lead" replace /> : children;
};

export default PublicRoute;
