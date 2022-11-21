import { useEffect, useState } from 'react';
import axios from 'axios';

export const useFetchData = <T extends unknown>(url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<T>();

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);

      try {
        const result = await axios(url);

        if (!cancelled) {
          setData(result.data);
          setError(false);
        }
      } catch (error) {
        !cancelled && setError(true);
      }

      setLoading(false);
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return {
    loading,
    error,
    data
  };
};
