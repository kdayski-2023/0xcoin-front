import { useEffect, useState } from 'react';
import RecoverService from '../services/recover.service';

const useRecover = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recoverLink, setRecoverLink] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const recover$ = RecoverService.state$.subscribe((state) => {
      setError(state.error);
      setLoading(state.loading);
      setRecoverLink(state.recoverLink);
      setSuccess(state.success);
    });

    return () => {
      recover$.unsubscribe();
    };
  }, []);

  return {
    loading,
    error,
    recoverLink,
    success,
  };
};

export default useRecover;
