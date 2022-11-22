import { act, renderHook } from '@testing-library/react-hooks';
import { mockDocuments } from '../mocks';
import { useTags } from '../useTags';

describe('useTags hook', () => {
  test(`Should add non existent tag`, () => {
    const { result } = renderHook(() => useTags(mockDocuments));

    act(() => {
      result.current.manageTags('aa');
    });

    expect(result.current.tags).toStrictEqual(['aa']);
  });

  test(`Should remove existing tag`, () => {
    const { result } = renderHook(() => useTags(mockDocuments));

    act(() => {
      result.current.setTags(['aa']);
    });
    act(() => {
      result.current.manageTags('aa');
    });

    expect(result.current.tags).toStrictEqual([]);
  });

  test(`Should filter out result according to tags`, () => {
    const { result } = renderHook(() => useTags(mockDocuments));

    act(() => {
      result.current.setTags(['aviation', 'technical']);
    });

    expect(result.current.selectedData).toHaveLength(1);
  });

  test(`Should show no results when tags are not matching`, () => {
    const { result } = renderHook(() => useTags(mockDocuments));

    act(() => {
      result.current.setTags(['xx']);
    });

    expect(result.current.selectedData).toHaveLength(0);
  });
});
