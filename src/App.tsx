import React from 'react';
import './App.scss';
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from './configs/theme';
import { AuthProvider } from './contexts/AuthContext';
import { SnackbarProvider } from 'notistack';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { PublicRoute } from './components/routes/PublicRoute';
import { PrivateRoute } from './components/routes/PrivateRoute';

export const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <SnackbarProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />

              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <RegisterPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </SnackbarProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};
