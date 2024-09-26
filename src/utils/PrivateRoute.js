import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check if the user is authenticated
  let isAuthenticated = localStorage.getItem('authToken');
  
  // assuming token is stored in localStorage
  if(!isAuthenticated){
    isAuthenticated = localStorage.getItem('associateToken')
  }

  // If not authenticated, redirect to the sign-in page
  return isAuthenticated ? children : <Navigate to="/auth/sign-in" replace />;
};

export default PrivateRoute;
