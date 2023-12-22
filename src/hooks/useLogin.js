import { useEffect, useState } from 'react';
import LoginService from '../services/login.service';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    const login$ = LoginService.state$.subscribe((state) => {
      setError(state.error);
      setLoading(state.loading);
      setSessionToken(state.sessionToken);
    });

    return () => {
      login$.unsubscribe();
    };
  }, []);

  return {
    loading,
    error,
    sessionToken,
  };
};

export default useLogin;
