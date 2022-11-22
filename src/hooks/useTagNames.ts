import { Document } from '../types/documents';
import { useEffect, useState } from 'react';

export const useTagNames = (documents?: Document[]) => {
  const [tagNames, setTagNames] = useState<string[]>([]);

  useEffect(() => {
    if (documents?.length) {
      const tags = documents.reduce((acc, doc) => {
        if (!doc.tags) {
          return acc;
        }
        return acc.concat(doc.tags);
      }, [] as string[]);

      setTagNames([...new Set(tags)]);
    }
  }, [documents]);

  return { tagNames };
};
