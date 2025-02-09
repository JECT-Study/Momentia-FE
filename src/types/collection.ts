import { PaginationType } from './pagination';

export interface CollectionType {
  collectionId: number;
  collectionImage: string;
  name: string;
  status: 'PUBLIC' | 'PRIVATE';
}

export interface ProfileCollectionListResponse {
  isMine: boolean;
  data: CollectionType[];
  page: PaginationType;
}
