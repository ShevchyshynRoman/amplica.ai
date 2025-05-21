import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { auth } from '../../configs/firebase';
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { emailRegex, passwordValidation } from '../../utils/validators';
import { handleFirebaseError } from '../../utils/firebaseErrorHandler';
import { AuthLink } from './AuthLink';

type FormData = {
  email: string;
  password: string;
  remember: boolean;
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [serverError, setServerError] = useState('');

  const onSubmit = async ({ email, password, remember }: FormData) => {
    try {
      setServerError('');

      await setPersistence(
        auth,
        remember ? browserLocalPersistence : browserSessionPersistence,
      );

      await signInWithEmailAndPassword(auth, email, password);

      navigate('/dashboard');
    } catch (err: unknown) {
      const errorMessage = handleFirebaseError(err, {
        defaultMessage: 'Error during login',
      });

      setServerError(errorMessage);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} width={300}>
      <Typography variant="h6">Login</Typography>

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

        <FormControlLabel
          control={<Checkbox {...register('remember')} />}
          label="Remember me"
        />

        {serverError && <Typography color="error">{serverError}</Typography>}

        <Button variant="contained" type="submit" fullWidth>
          Log in
        </Button>
      </form>

      <AuthLink
        question="Don't have an account?"
        linkText="Register"
        to="/register"
      />
    </Box>
  );
};
