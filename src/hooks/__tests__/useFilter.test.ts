import { act, renderHook } from '@testing-library/react-hooks';
import { useFilter } from '../useFilter';
import { mockDocuments } from '../mocks';

describe('useFilter hook', () => {
  test(`Should show all results when no filter value is given`, () => {
    const { result } = renderHook(() => useFilter(mockDocuments));
    expect(result.current.filteredData?.length).toBe(mockDocuments.length);
  });

  test(`Should filter out results properly`, () => {
    const { result } = renderHook(() => useFilter(mockDocuments));
    act(() => {
      result.current.setFilterValue('Tech');
    });

    expect(result.current.filteredData?.length).toBe(1);
  });

  test(`Should ignore upper / lower case of input value`, () => {
    const { result } = renderHook(() => useFilter(mockDocuments));

    act(() => {
      result.current.setFilterValue('xyz');
    });

    expect(result.current.filteredData?.[0].title).toContain('XYZ');
  });
});
