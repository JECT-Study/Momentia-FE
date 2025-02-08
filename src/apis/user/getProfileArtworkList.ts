import { USER } from '@/constants/API';
import { UserArtworkListParams, UserArtworkResponse } from '@/types/user';
import TokenHandler from '@/utils/tokenHandler';

import defaultClient, { authorizedClient } from '..';

const getProfileArtworkList = async ({
  sort,
  page,
  size,
  userId,
}: UserArtworkListParams) => {
  const currentClient =
    TokenHandler.getAccessToken() !== '' ? authorizedClient : defaultClient;

  try {
    const { data } = await currentClient.get<UserArtworkResponse>(
      `${USER.artworkList}?sort=${sort}&page=${page}&size=${size}&userId=${userId}`,
    );

    return data;
  } catch (error) {
    console.error('프로필 페이지 내 작품 리스트 조회 중 에러 발생: ', error);
    throw new Error('프로필 페이지 내 작품 리스트 조회 실패');
  }
};

export default getProfileArtworkList;
