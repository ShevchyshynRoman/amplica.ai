import { Box } from '@mui/material';
import { RegisterForm } from '../components/auth/RegisterForm';

export const RegisterPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <RegisterForm />
    </Box>
  );
};
