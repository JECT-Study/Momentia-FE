import { PaginationType } from './pagination';

export interface ArtworkInfoType {
  postId: number;
  title: string;
  postImage: string;
  userId: number;
  nickname: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
}

export interface ArtworkListParams {
  sort: string;
  artworkField?: string;
  search: string;
  page: number;
  size: number;
}

export interface ArtworkListResponse {
  data: ArtworkInfoType[];
  page: PaginationType;
}

export interface ArtworkField {
  name: string;
  value: string;
}

export interface ArtworkUploadData {
  title: string;
  artworkField: string;
  postImage: File;
  explanation: string;
  status: string;
}

export interface PatchArtworkData {
  title?: string;
  artworkField?: string;
  explanation?: string;
  status?: 'PUBLIC' | 'PRIVATE';
}
