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

export interface ArtworkPostType extends ArtworkInfoType {
  artworkField: string;
  createdTime: string;
  explanation: string;
  profileImage: string | null;
  userField: string | null;
  isFollow: boolean;
  introduction: string;
  isMine: boolean;
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

export interface ArtworkPostSocialInfoType
  extends Pick<
    ArtworkPostType,
    'postId' | 'nickname' | 'title' | 'likeCount' | 'isLiked'
  > {}

export interface PatchArtworkData {
  title?: string;
  artworkField?: string;
  explanation?: string;
  status?: 'PUBLIC' | 'PRIVATE';
}

export interface ArtworkFieldsErrors {
  artworkTitleError?: string;
  selectedArtworkFieldError?: string;
  uploadedImageError?: string;
}

export interface ArtworkPostHeaderInfoType
  extends Pick<
    ArtworkPostType,
    | 'title'
    | 'artworkField'
    | 'viewCount'
    | 'profileImage'
    | 'nickname'
    | 'createdTime'
  > {}

export interface ArtworkPostdetailInfoType
  extends Pick<
    ArtworkPostType,
    'postId' | 'userId' | 'postImage' | 'explanation' | 'isMine'
  > {}

export interface ArtworkPostArtistInfoType
  extends Pick<
    ArtworkPostType,
    | 'userId'
    | 'profileImage'
    | 'nickname'
    | 'userField'
    | 'isFollow'
    | 'introduction'
  > {}

export interface ArtworkComment {
  commentId: number;
  userId: number;
  profileImage: string;
  nickname: string;
  content: string;
  createdTime: string;
  isMine: boolean;
}
