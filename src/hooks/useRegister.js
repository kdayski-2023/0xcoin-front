import { useEffect, useState } from 'react';
import RegisterService from '../services/register.service';

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    const register$ = RegisterService.state$.subscribe((state) => {
      setError(state.error);
      setLoading(state.loading);
      setSessionToken(state.sessionToken);
    });

    return () => {
      register$.unsubscribe();
    };
  }, []);

  return {
    loading,
    error,
    sessionToken,
  };
};

export default useRegister;
