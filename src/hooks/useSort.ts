import { useEffect, useState } from 'react';
import { Document } from '../types/documents';

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export enum SortKeys {
  ORIGIN = 'origin',
  PRIORITY = 'priority'
}

export function useSort(data?: Document[]) {
  const [sortKey, setSortKey] = useState(SortKeys.ORIGIN);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.ASC
  );
  const [sortedData, setSortedData] = useState<Document[] | undefined>(data);

  useEffect(() => {
    if (!data) return;
    const dataToSort = [...data];
    const isAscending = sortDirection === SortDirection.ASC;

    if (sortKey === SortKeys.ORIGIN) {
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
    sortedData,
    sortDirection,
    setSortDirection,
    sortKey,
    setSortKey
  };
}
