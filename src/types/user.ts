import { ArtworkListParams } from './artwork';

export interface UserType {
  isMine: boolean;
  email: string;
  followerCount: number;
  followingCount: number;
  userId: number;
  profileImage: string;
  nickname: string;
  introduction: string;
  isFollow: boolean;
  field: string;
}

export interface UserArtworkListParams
  extends Pick<ArtworkListParams, 'sort' | 'page' | 'size'> {
  userId: number;
}
