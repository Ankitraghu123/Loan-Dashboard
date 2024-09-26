import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  // Check if the user is authenticated
  let isAuthenticated = localStorage.getItem('authToken'); // assuming token is stored in localStorage

  if(!isAuthenticated){
    isAuthenticated = localStorage.getItem('associateToken')
  }

  // If authenticated, redirect to the dashboard or some other page
  return isAuthenticated ? <Navigate to="/admin/add-lead" replace /> : children;
};

export default PublicRoute;
