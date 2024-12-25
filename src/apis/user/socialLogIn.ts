import { USER } from '@/constants/API';
import { useQuery } from '@tanstack/react-query';
import defaultClient from '..';

const getSocialLogin = async (queryUrl: string) => {
  const { data } =
    await defaultClient.get<ResponseRootType<SocialLoginAuthType>>(queryUrl);

  return data;
};

const useGetSocialLogin = ({
  provider,
  params,
}: {
  provider: string;
  params: string;
}) => {
  const queryUrl = `${USER.socialLogin}/${provider}?${params}`;
  const { data, isLoading } = useQuery({
    queryKey: [`${USER.socialLogin}/${provider}`],
    queryFn: () => getSocialLogin(queryUrl),
  });

  const hasData = !!data;

  const authorizedRes: SocialLoginAuthType = hasData
    ? data.value
    : {
        isRegistered: false,
        token: {
          accessToken: '',
          refreshToken: '',
        },
      };

  return { hasData, authorizedRes, isLoading };
};

export default useGetSocialLogin;
