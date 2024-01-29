import { useEffect, useState } from 'react';
import Subscription from '../services/subscription.service';

const useSubscription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const subscription$ = Subscription.state$.subscribe((state) => {
      setError(state.error);
      setLoading(state.loading);
      setSubscription(state.subscription);
      setPrices(state.prices);
    });

    return () => {
      subscription$.unsubscribe();
    };
  }, []);

  return {
    loading,
    error,
    subscription,
    prices,
  };
};

export default useSubscription;
