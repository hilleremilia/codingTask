import { Document } from '../../types/documents';

export const mockDocuments: Document[] = [
  {
    title: 'User Guide',
    publication_date: '2020-01-01T01:00:00Z',
    priority: 1,
    origin: 'gov',
    tags: ['aviation']
  },
  {
    title: 'Technical manual A',
    publication_date: '2012-05-01T01:00:00Z',
    priority: 2,
    origin: 'private',
    tags: ['aviation', 'technical']
  },
  {
    title: 'Specification XYZ',
    publication_date: '2018-12-01T01:00:00Z',
    priority: 2,
    origin: 'private'
  },
  {
    title: 'Equipment List',
    publication_date: '1995-03-30T01:00:00Z',
    priority: 3,
    origin: 'private'
  },
  {
    title: 'Organizational History',
    publication_date: '1970-03-30T01:00:00Z',
    priority: 3,
    origin: 'gov'
  },
  {
    title: 'User Manual',
    priority: 2
  }
];
