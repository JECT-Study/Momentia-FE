import { USER } from '@/constants/API';
import { ArtworkListResponse } from '@/types/artwork';
import { UserArtworkListParams } from '@/types/user';

import { authorizedClient } from '..';

interface GetLikedArtworkListProps
  extends Omit<UserArtworkListParams, 'userId'> {}

const getLikedArtworkList = async ({
  sort,
  page,
  size,
}: GetLikedArtworkListProps) => {
  const { data } = await authorizedClient.get<ArtworkListResponse>(
    `${USER.likedArtworkList}?sort=${sort}&page=${page}&size=${size}`,
  );

  return data;
};

export default getLikedArtworkList;
