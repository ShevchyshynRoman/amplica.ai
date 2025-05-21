import { Box } from '@mui/material';
import { LoginForm } from '../components/auth/LoginForm';

export const LoginPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <LoginForm />
    </Box>
  );
};
