import { SocialSignInAuthType } from '@/types/auth';

import defaultClient from '..';

const getSocialSignIn = async (queryUrl: string) => {
  const { data } = await defaultClient.get<SocialSignInAuthType>(queryUrl);

  return data;
};

export default getSocialSignIn;
