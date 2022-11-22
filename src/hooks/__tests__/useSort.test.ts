import { renderHook } from '@testing-library/react-hooks';
import { mockDocuments } from '../mocks';
import { SortDirection, useSort } from '../useSort';

describe('useSort hook', () => {
  test(`Should return all documents`, () => {
    const { result } = renderHook(() =>
      useSort(SortDirection.ASC, 'origin', mockDocuments)
    );
    expect(result.current.sortedData?.length).toBe(mockDocuments.length);
  });

  test(`Should sort by origin in ascending order`, () => {
    const { result } = renderHook(() =>
      useSort(SortDirection.ASC, 'origin', mockDocuments)
    );

    expect(result.current.sortedData).toStrictEqual(
      [...mockDocuments].sort((a, b) => {
        if (!a.origin) return 1;
        if (!b.origin) return -1;
        return a.origin.localeCompare(b.origin);
      })
    );
  });

  test(`Should sort by origin in descending order`, () => {
    const { result } = renderHook(() =>
      useSort(SortDirection.DESC, 'origin', mockDocuments)
    );

    expect(result.current.sortedData).toStrictEqual(
      [...mockDocuments].sort((a, b) => {
        if (!a.origin) return 1;
        if (!b.origin) return -1;
        return b.origin.localeCompare(a.origin);
      })
    );
  });

  test(`Should sort by priority in descending order`, () => {
    const { result } = renderHook(() =>
      useSort(SortDirection.DESC, 'priority', mockDocuments)
    );

    expect(result.current.sortedData).toStrictEqual(
      [...mockDocuments].sort((a, b) => b.priority - a.priority)
    );
  });

  test(`Should sort by priority in ascending order`, () => {
    const { result } = renderHook(() =>
      useSort(SortDirection.ASC, 'priority', mockDocuments)
    );

    expect(result.current.sortedData).toStrictEqual(
      [...mockDocuments].sort((a, b) => a.priority - b.priority)
    );
  });
});
