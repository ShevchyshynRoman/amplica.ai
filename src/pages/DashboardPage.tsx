import { Box, Button, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../configs/firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        <Typography>{user?.email}</Typography>

        <Button variant="outlined" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};
