import { FirebaseError } from 'firebase/app';
import { FIREBASE_ERRORS } from '../configs/errorMessages';

type ErrorHandlerConfig = {
  defaultMessage?: string;
};

export const handleFirebaseError = (
  error: unknown,
  config?: ErrorHandlerConfig,
): string => {
  const defaultMessage = config?.defaultMessage || 'An unknown error occurred.';

  if (error instanceof FirebaseError) {
    return (
      FIREBASE_ERRORS[error.code as keyof typeof FIREBASE_ERRORS] ||
      error.message
    );
  }

  return defaultMessage;
};
