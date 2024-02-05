import { useEffect, useState } from 'react';
import ContentServiceInstance from 'services/content.service';

const useContent = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const content$ = ContentServiceInstance.state$.subscribe((state) => {
      setError(state.error);
      setLoading(state.loading);
      setContent(state.content);
    });

    return () => {
      content$.unsubscribe();
    };
  }, []);

  return {
    loading,
    error,
    content,
  };
};

export default useContent;
