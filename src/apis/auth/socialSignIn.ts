import { USER } from '@/constants/API';
import { SocialSignInAuthType } from '@/types/auth';
import TokenHandler from '@/utils/tokenHandler';
import defaultClient from '..';

import { useQuery } from '@tanstack/react-query';

const getSocialSignIn = async (queryUrl: string) => {
  const { data } = await defaultClient.get<SocialSignInAuthType>(queryUrl);

  return data;
};

const useGetSocialSignIn = ({
  provider,
  params,
}: {
  provider: string;
  params: string;
}) => {
  const socialSignInUrl = `${USER.socialSignIn}/${provider.toUpperCase()}?${params}`;

  const { data, isLoading } = useQuery({
    queryKey: [`${USER.socialSignIn}/${provider}`],
    queryFn: () => getSocialSignIn(socialSignInUrl),
  });

  if (data) {
    TokenHandler.setToken(data.token);
  }

  return { hasData: !!data, isLoading };
};

export default useGetSocialSignIn;
