import { Document } from '../types/documents';
import { useEffect, useState } from 'react';

export const useFilter = (data?: Document[]) => {
  const [filteredData, setFilteredData] = useState<Document[]>();
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    if (filterValue) {
      setFilteredData(
        data?.filter((document) =>
          document.title.toLowerCase().includes(filterValue.toLowerCase())
        )
      );

      return;
    }

    setFilteredData(data);
  }, [data, filterValue]);

  return {
    filteredData,
    setFilterValue
  };
};
