import { USER } from '@/constants/API';
import { UserType } from '@/types/user';
import TokenHandler from '@/utils/tokenHandler';

import defaultClient, { authorizedClient } from '..';

const getProfileInfo = async (userId: number) => {
  const currentClient =
    TokenHandler.getAccessToken() !== '' ? authorizedClient : defaultClient;

  try {
    const { data } = await currentClient.get<UserType>(
      `${USER.userProfile}?userId=${userId}`,
    );

    return data;
  } catch (error) {
    throw new Error('작가 정보 조회에 실패하였습니다.');
  }
};

export default getProfileInfo;
