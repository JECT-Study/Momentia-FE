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
  profileImage: string;
  nickname: string;
  introduction: string;
  isFollow: boolean;
  userField: string;
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

export interface FollowUser
  extends Pick<
    UserType,
    'userId' | 'profileImage' | 'nickname' | 'introduction'
  > {}

export interface UserStringProfileType
  extends Partial<Pick<UserType, 'nickname' | 'userField' | 'introduction'>> {}

export interface UpdateProfileType extends Partial<UserStringProfileType> {
  profileImage?: number;
}
