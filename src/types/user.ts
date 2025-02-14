import {
  ArtworkInfoType,
  ArtworkListParams,
  ArtworkListResponse,
} from './artwork';

export interface UserType {
  isMine: boolean;
  email: string;
  followerCount: number;
  followingCount: number;
  userId: number;
  profileImage: string | null;
  nickname: string;
  introduction: string | null;
  isFollow: boolean | null;
  userField: string | null;
}

export interface UserArtworkListParams
  extends Pick<ArtworkListParams, 'sort' | 'page' | 'size'> {
  userId: number;
}

export interface UserArtworkInfoType extends ArtworkInfoType {
  status?: 'PUBLIC' | 'PRIVATE' | null;
}

export interface UserArtworkResponse extends ArtworkListResponse {
  data: UserArtworkInfoType[];
  isMine: boolean;
}

export interface FollowUserType
  extends Pick<
    UserType,
    'userId' | 'profileImage' | 'nickname' | 'introduction' | 'isFollow'
  > {}

export interface UserStringProfileType
  extends Partial<Pick<UserType, 'nickname' | 'introduction'>> {
  field?: string;
}

export interface UpdateProfileType extends Partial<UserStringProfileType> {
  profileImage?: number;
}
