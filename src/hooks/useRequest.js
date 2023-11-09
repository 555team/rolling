import fetch from 'apis/api';
import { useState, useEffect } from 'react';

const useRequest = ({ deps, skip, ...args }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetcher = async () => {
    try {
      setIsLoading(true);
      const { data } = await fetch({ ...args });
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (skip) return;
    fetcher();
  }, [deps]);

  return { data, isLoading, error, fetcher };
};

export default useRequest;
