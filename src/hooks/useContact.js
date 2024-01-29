import { useEffect, useState } from 'react';
import ContactService from '../services/contact.service';

const useContact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const recover$ = ContactService.state$.subscribe((state) => {
      setError(state.error);
      setLoading(state.loading);
      setSuccess(state.success);
    });

    return () => {
      recover$.unsubscribe();
    };
  }, []);

  return {
    loading,
    error,
    success,
  };
};

export default useContact;
