import { useEffect, useState } from 'react';
import CurrencyServiceInstance from 'services/currency.service';

const useCurrency = () => {
  const [currency, setCurrency] = useState('BTC');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const currency$ = CurrencyServiceInstance.state$.subscribe((state) => {
      setError(state.error);
      setLoading(state.loading);
      setCurrency(state.currency);
    });

    return () => {
      currency$.unsubscribe();
    };
  }, []);

  return {
    loading,
    error,
    currency,
  };
};

export default useCurrency;
