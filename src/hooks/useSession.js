import { useEffect, useState } from 'react';
import LoginService from '../services/login.service';
import RegisterService from '../services/register.service';
import { getToken, saveToken } from '../utils/token/token';

const useSession = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    setSessionToken(getToken());
  }, []);

  useEffect(() => {
    const login$ = LoginService.state$.subscribe((state) => {
      setError(state.error);
      setLoading(state.loading);
      setSessionToken(state.sessionToken);
      saveToken(state.sessionToken);
    });

    return () => {
      login$.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const register$ = RegisterService.state$.subscribe((state) => {
      setError(state.error);
      setLoading(state.loading);
      setSessionToken(state.sessionToken);
      saveToken(state.sessionToken);
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

export default useSession;
