import { USER } from '@/constants/API';
import { AuthTokenType } from '@/types/auth';

import defaultClient from '..';

const postRefreshToken = async (refreshToken: string) => {
  const { data } = await defaultClient.post<AuthTokenType>(USER.refresh, {
    refreshToken,
  });

  return data;
};

export default postRefreshToken;
