import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return;
  }

  return user ? children : <Navigate to="/login" replace />;
};
