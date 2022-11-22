import { renderHook } from '@testing-library/react-hooks';
import { useFilter } from '../useFilter';
import { mockDocuments } from '../mocks';

describe('useFilter hook', () => {
  test(`Should show no results for an non existent title value`, () => {
    const { result } = renderHook(() => useFilter('xx', mockDocuments));
    expect(result.current.filteredData?.length).toBe(0);
  });

  test(`Should filter out results properly`, () => {
    const { result } = renderHook(() => useFilter('Tech', mockDocuments));
    expect(result.current.filteredData?.length).toBe(1);
  });

  test(`Should ignore upper / lower case of input value`, () => {
    const { result } = renderHook(() => useFilter('xyz', mockDocuments));
    expect(result.current.filteredData?.[0].title).toContain('XYZ');
  });
});
