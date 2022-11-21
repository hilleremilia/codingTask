import { useEffect, useState } from 'react';
import { Document } from '../types/documents';

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export const keys = ['origin', 'priority'];

export function useSort(
  sortDirection: SortDirection,
  sortKey: string,
  data?: Document[]
) {
  const [sortedData, setSortedData] = useState<Document[] | undefined>(data);

  useEffect(() => {
    if (!data) return;
    const dataToSort = [...data];
    const isAscending = sortDirection === SortDirection.ASC;

    if (sortKey === 'origin') {
      setSortedData(
        dataToSort?.sort((a, b) => {
          if (!a.origin) return 1;
          if (!b.origin) return -1;

          return isAscending
            ? a.origin.localeCompare(b.origin)
            : b.origin.localeCompare(a.origin);
        })
      );

      return;
    }

    setSortedData(
      dataToSort?.sort((a, b) =>
        isAscending ? a.priority - b.priority : b.priority - a.priority
      )
    );
  }, [data, sortKey, sortDirection]);

  return {
    sortedData
  };
}
