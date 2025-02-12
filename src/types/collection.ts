import { ArtworkInfoType } from './artwork';
import { PaginationType } from './pagination';

export interface CollectionType {
  collectionId: number;
  collectionImage: string;
  name: string;
  collectionStatus: 'PUBLIC' | 'PRIVATE';
}

export interface ProfileCollectionListResponse {
  isMine: boolean;
  data: CollectionType[];
  page: PaginationType;
}

export interface CollectionArtworksResponse {
  isMine: boolean;
  name: string;
  data: ArtworkInfoType[];
  page: PaginationType;
}

export interface PatchCollectionData {
  name?: string;
  status?: 'PUBLIC' | 'PRIVATE';
}

export interface PatchCollectionParams {
  collectionId: number;
  data: PatchCollectionData;
}

export interface CollectionArtworksParams {
  collectionId: number;
  sort: string;
  page: number;
  size: number;
}

export interface CollectionAddAndRemoveArtworkParams {
  collectionId: number;
  postId: number;
}
