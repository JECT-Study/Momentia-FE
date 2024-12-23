import { USER } from '@/constants/API';
import { useQuery } from '@tanstack/react-query';
import defaultClient from '..';

const getSocialSignIn = async (queryUrl: string) => {
  const { data } =
    await defaultClient.get<ResponseRootType<SocialSignInAuthType>>(queryUrl);

  return data;
};

const useGetSocialSignIn = ({
  provider,
  params,
}: {
  provider: string;
  params: string;
}) => {
  const queryUrl = `${USER.socialsignIn}/${provider}?${params}`;
  const { data, isLoading } = useQuery({
    queryKey: [`${USER.socialsignIn}/${provider}`],
    queryFn: () => getSocialSignIn(queryUrl),
  });

  const hasData = !!data;

  const authorizedResponse: SocialSignInAuthType = hasData
    ? data.value
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
