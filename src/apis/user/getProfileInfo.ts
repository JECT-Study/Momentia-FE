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
    console.error('작가 정보 조회 중 에러 발생: ', error);
    throw new Error('작가 정보 조회 실패');
  }
};

export default getProfileInfo;
