import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

interface AuthLinkProps {
  question: string;
  linkText: string;
  to: string;
}

export const AuthLink = ({ question, linkText, to }: AuthLinkProps) => {
  return (
    <Box sx={{ textAlign: 'center', mt: 1 }}>
      <Typography variant="body2">
        {question}{' '}
        <Link
          to={to}
          style={{
            textDecoration: 'none',
            color: '#1976d2',
            fontWeight: 500,
          }}
        >
          {linkText}
        </Link>
      </Typography>
    </Box>
  );
};
