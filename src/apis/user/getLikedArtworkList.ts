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
    console.error(
      '프로필 페이지 내 좋아요 작품 리스트 조회 중 에러 발생: ',
      error,
    );
    throw new Error('프로필 페이지 내 좋아요 작품 리스트 조회 실패');
  }
};

export default getLikedArtworkList;
