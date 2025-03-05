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
  try {
    const { data } = await authorizedClient.get<ArtworkListResponse>(
      `${USER.likedArtworkList}?sort=${sort}&page=${page}&size=${size}`,
    );

    return data;
  } catch (error) {
    throw new Error('좋아요한 작품 목록 조회에 실패하였습니다.');
  }
};

export default getLikedArtworkList;
