import { USER } from '@/constants/API';
import { UserArtworkListParams, UserArtworkResponse } from '@/types/user';
import TokenHandler from '@/utils/tokenHandler';

import defaultClient, { authorizedClient } from '..';

const getUserArtworkList = async ({
  sort,
  page,
  size,
  userId,
}: UserArtworkListParams) => {
  const currentClient =
    TokenHandler.getAccessToken() !== '' ? authorizedClient : defaultClient;

  const { data } = await currentClient.get<UserArtworkResponse>(
    `${USER.artworkList}?sort=${sort}&page=${page}&size=${size}&userId=${userId}`,
  );

  return data;
};

export default getUserArtworkList;
