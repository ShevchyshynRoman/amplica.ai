import { LinearProgress, Typography } from '@mui/material';

export const PasswordStrengthProgress = ({
  passwordStrength,
}: {
  passwordStrength: number;
}) => {
  return (
    <>
      <LinearProgress
        variant="determinate"
        value={passwordStrength * 100}
        sx={{ my: 1 }}
      />
      <Typography variant="caption">
        Password strength: {Math.round(passwordStrength * 100)}%
      </Typography>
    </>
  );
};
