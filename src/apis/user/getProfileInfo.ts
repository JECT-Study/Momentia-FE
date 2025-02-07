import { USER } from '@/constants/API';
import { UserType } from '@/types/user';
import TokenHandler from '@/utils/tokenHandler';

import defaultClient, { authorizedClient } from '..';

const getProfileInfo = async (userId: number) => {
  const currentClient =
    TokenHandler.getAccessToken() !== '' ? authorizedClient : defaultClient;

  const { data } = await currentClient.get<UserType>(
    `${USER.userProfile}?userId=${userId}`,
  );

  return data;
};

export default getProfileInfo;
