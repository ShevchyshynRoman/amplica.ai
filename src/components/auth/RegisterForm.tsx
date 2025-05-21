import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { Box, Button, TextField, Typography } from '@mui/material';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from '../../configs/firebase';
import {
  emailRegex,
  getPasswordStrength,
  passwordValidation,
} from '../../utils/validators';
import { handleFirebaseError } from '../../utils/firebaseErrorHandler';
import { PasswordStrengthProgress } from '../UI/PasswordStrengthProgress';
import { AuthLink } from './AuthLink';

type FormData = {
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const [serverError, setServerError] = useState('');
  const watchedPassword = watch('password', '');
  const passwordStrength = getPasswordStrength(watchedPassword);

  const onSubmit = async ({ email, password }: FormData) => {
    try {
      setServerError('');

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await sendEmailVerification(userCredentials.user);

      enqueueSnackbar('Check your email for confirmation!', {
        variant: 'success',
      });

      navigate('/login');
    } catch (err: unknown) {
      const errorMessage = handleFirebaseError(err, {
        defaultMessage: 'Error during registration',
      });

      setServerError(errorMessage);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} width={300}>
      <Typography variant="h6">Registration</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={1} mb={1}>
          <TextField
            label="Email"
            fullWidth
            {...register('email', {
              required: 'Email required',
              pattern: {
                value: emailRegex,
                message: 'Invalid email',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            {...register('password', passwordValidation)}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Box>

        <PasswordStrengthProgress passwordStrength={passwordStrength} />

        {serverError && <Typography color="error">{serverError}</Typography>}

        <Button variant="contained" type="submit" fullWidth>
          Register
        </Button>
      </form>

      <AuthLink
        question="Already have an account?"
        linkText="Log in"
        to="/login"
      />
    </Box>
  );
};
