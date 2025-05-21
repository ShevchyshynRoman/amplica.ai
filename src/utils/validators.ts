export const getPasswordStrength = (password: string): number => {
  let score = 0;

  if (password.length > 5) {
    score += 1;
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  }

  if (/[0-9]/.test(password)) {
    score += 1;
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1;
  }

  if (password.length > 10) {
    score += 1;
  }

  return Math.min(score / 5, 1);
};

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const passwordValidation = {
  required: 'Password required',
  minLength: {
    value: 6,
    message: 'Minimum 6 characters',
  },
};
