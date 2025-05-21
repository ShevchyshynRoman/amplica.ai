import { useEffect, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../configs/firebase';

const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 min auto logout

export const useAutoLogout = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      signOut(auth);
    }, INACTIVITY_LIMIT);
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click', 'scroll'];

    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, []);
};
