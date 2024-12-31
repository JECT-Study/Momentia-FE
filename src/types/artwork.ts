interface ArtworkInfoType {
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

interface Pagination {
  totalDataCnt: number;
  totalPages: number;
  isLastPage: boolean;
  requestSize: number;
}

interface ArtworkResponse {
  data: ArtworkInfoType[];
  page: Pagination;
}
