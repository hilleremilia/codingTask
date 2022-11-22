import { renderHook } from '@testing-library/react-hooks';
import { mockDocuments } from '../mocks';
import { useTagNames } from '../useTagNames';

describe('useTagNames hook', () => {
  test(`Should extract tags based on given data`, () => {
    const { result } = renderHook(() => useTagNames(mockDocuments));
    expect(result.current.tagNames).toStrictEqual(['aviation', 'technical']);
  });
});
