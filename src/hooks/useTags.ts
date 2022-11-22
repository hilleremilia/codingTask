import { Document } from '../types/documents';
import { useEffect, useState } from 'react';

export const useTags = (documents?: Document[]) => {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedData, setSelectedData] = useState<Document[]>();

  useEffect(() => {
    if (tags.length) {
      setSelectedData(
        documents?.filter((document) =>
          tags.every((tag) => {
            return document.tags?.includes(tag);
          })
        )
      );
      return;
    }

    setSelectedData(documents);
  }, [documents, tags]);

  const checkTagExists = (tag: string, tags: string[]) => tags.includes(tag);

  const filterTags = (tags: string[], tag: string): string[] =>
    tags.filter((prevTag: string) => {
      return prevTag !== tag;
    });

  const appendTag = (tags: string[], tag: string): string[] => {
    const newTags = [...tags];
    newTags.push(tag);

    return newTags;
  };

  const manageTags = (tag: string) =>
    setTags((prevTags) =>
      checkTagExists(tag, prevTags)
        ? filterTags(prevTags, tag)
        : appendTag(prevTags, tag)
    );

  return {
    selectedData,
    checkTagExists,
    tags,
    manageTags,
    setTags
  };
};
