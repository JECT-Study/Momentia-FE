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
