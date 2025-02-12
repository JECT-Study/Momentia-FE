import { USER } from '@/constants/API';
import { FollowUserType } from '@/types/user';
import TokenHandler from '@/utils/tokenHandler';

import defaultClient, { authorizedClient } from '..';

const getFollowerList = async (userId: number) => {
  const currentClient =
    TokenHandler.getAccessToken() !== '' ? authorizedClient : defaultClient;

  const { data } = await currentClient.get<{ users: FollowUserType[] }>(
    USER.followerList(userId),
  );

  return data;
};

export default getFollowerList;
