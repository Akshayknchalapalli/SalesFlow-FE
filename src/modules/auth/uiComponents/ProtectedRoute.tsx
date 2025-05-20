import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import authApi from '../apis/authApi';
import { UserRole } from '../model/AuthModels';

interface ProtectedRouteProps {
  requiredRoles?: UserRole[];
  requiredPermissions?: string[];
  redirectTo?: string;
}

/**
 * A component that protects routes based on authentication status,
 * role-based access control, and permission-based access control
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRoles = [],
  requiredPermissions = [],
  redirectTo = '/login',
}) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userPermissions, setUserPermissions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for token in localStorage or sessionStorage
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        
        if (!token) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // Fetch current user if token exists
        const user = await authApi.getCurrentUser();
        
        if (user) {
          setIsAuthenticated(true);
          setUserRole(user.role);
          // In a real app, you might get permissions from the user object
          setUserPermissions(['VIEW_DASHBOARD', 'MANAGE_LEADS']); // Example permissions
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Authentication check error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // If still loading, show spinner
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  // Check if the user is authenticated
  if (!isAuthenticated) {
    // Redirect to login page with return URL
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check required roles if specified
  if (requiredRoles.length > 0 && (!userRole || !requiredRoles.includes(userRole))) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check required permissions if specified
  if (
    requiredPermissions.length > 0 &&
    (!userPermissions || !requiredPermissions.some(permission => userPermissions.includes(permission)))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }



  // If all checks pass, render the protected content
  return <Outlet />;
};

export default ProtectedRoute;