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
    throw new Error('작품 목록 조회에 실패하였습니다.');
  }
};

export default getProfileArtworkList;
