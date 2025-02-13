import { UserType } from './user';

export interface ArtistInfoType
  extends Omit<
    UserType,
    'isMine' | 'email' | 'followingCount' | 'followerCount' | 'userField'
  > {
  userField: string;
  artworkImage: string;
}
