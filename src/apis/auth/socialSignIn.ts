import { USER } from '@/constants/API';
import { useQuery } from '@tanstack/react-query';
import defaultClient from '..';

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
  const socialSignInUrl = `${USER.socialSignIn}/${provider}?${params}`;

  const { data, isLoading } = useQuery({
    queryKey: [`${USER.socialSignIn}/${provider}`],
    queryFn: () => getSocialSignIn(socialSignInUrl),
  });

  const hasData = !!data;

  const authorizedResponse: SocialSignInAuthType = hasData
    ? data
    : {
        isRegistered: false,
        token: {
          accessToken: '',
          refreshToken: '',
        },
      };

  return { hasData, authorizedResponse, isLoading };
};

export default useGetSocialSignIn;