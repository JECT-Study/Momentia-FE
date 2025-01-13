import { useQuery } from '@tanstack/react-query';

import getSocialSignIn from '@/apis/auth/socialSignIn';
import { USER } from '@/constants/API';
import TokenHandler from '@/utils/tokenHandler';

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
