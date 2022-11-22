import { renderHook, act } from '@testing-library/react-hooks';
import { mockDocuments } from '../mocks';
import { SortDirection, SortKeys, useSort } from '../useSort';

describe('useSort hook', () => {
  test(`Should return all documents`, () => {
    const { result } = renderHook(() => useSort(mockDocuments));
    expect(result.current.sortedData?.length).toBe(mockDocuments.length);
  });

  test(`Should set default sort settings`, () => {
    const { result } = renderHook(() => useSort(mockDocuments));
    expect(result.current.sortKey).toBe(SortKeys.ORIGIN);
    expect(result.current.sortDirection).toBe(SortDirection.ASC);
  });

  test(`Should sort by origin in ascending order`, () => {
    const { result } = renderHook(() => useSort(mockDocuments));

    expect(result.current.sortedData).toStrictEqual(
      [...mockDocuments].sort((a, b) => {
        if (!a.origin) return 1;
        if (!b.origin) return -1;
        return a.origin.localeCompare(b.origin);
      })
    );
  });

  test(`Should sort by origin in descending order`, () => {
    const { result } = renderHook(() => useSort(mockDocuments));

    act(() => {
      result.current.setSortDirection(SortDirection.DESC);
    });

    expect(result.current.sortedData).toStrictEqual(
      [...mockDocuments].sort((a, b) => {
        if (!a.origin) return 1;
        if (!b.origin) return -1;
        return b.origin.localeCompare(a.origin);
      })
    );
  });

  test(`Should sort by priority in descending order`, () => {
    const { result } = renderHook(() => useSort(mockDocuments));

    act(() => {
      result.current.setSortDirection(SortDirection.DESC);
    });
    act(() => {
      result.current.setSortKey(SortKeys.PRIORITY);
    });

    expect(result.current.sortedData).toStrictEqual(
      [...mockDocuments].sort((a, b) => b.priority - a.priority)
    );
  });

  test(`Should sort by priority in ascending order`, () => {
    const { result } = renderHook(() => useSort(mockDocuments));

    act(() => {
      result.current.setSortDirection(SortDirection.ASC);
    });
    act(() => {
      result.current.setSortKey(SortKeys.PRIORITY);
    });

    expect(result.current.sortedData).toStrictEqual(
      [...mockDocuments].sort((a, b) => a.priority - b.priority)
    );
  });
});
