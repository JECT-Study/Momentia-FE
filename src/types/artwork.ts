import { Pagination } from './pagination';

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

export interface ArtworkListResponse {
  data: ArtworkInfoType[];
  page: Pagination;
}
