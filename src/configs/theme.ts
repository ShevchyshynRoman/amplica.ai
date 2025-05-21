import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
  },
  palette: {
    success: {
      main: '#4CAF50',
      contrastText: '#fff',
    },
    error: {
      main: '#d32f2f',
      contrastText: '#fff',
    },
  },
});

export default theme;
