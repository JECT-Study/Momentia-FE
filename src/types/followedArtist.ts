import { ArtworkInfoType } from './artwork';

export interface FollowedArtist {
  userId: number;
  nickname: string;
  userImage: string | null;
  userField: string | null;
  isFollow: boolean;
  posts: (ArtworkInfoType & { createdTime: string })[];
}

export interface FollowedArtistsResponse {
  posts: FollowedArtist[];
}
