import { Document } from '../types/documents';
import { useEffect, useState } from 'react';

export const useFilter = (value: string, data?: Document[]) => {
  const [filteredData, setFilteredData] = useState<Document[]>();

  useEffect(() => {
    if (value) {
      setFilteredData(
        data?.filter((document) =>
          document.title.toLowerCase().includes(value.toLowerCase())
        )
      );

      return;
    }

    setFilteredData(data);
  }, [data, value]);

  return {
    filteredData
  };
};
