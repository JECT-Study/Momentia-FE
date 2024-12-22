import { USER } from '@/constants/API';
import { useQuery } from '@tanstack/react-query';
import defaultClient from '..';

const getValidateNickname = async (
  nickname: string,
): Promise<ValidateResponse> => {
  const { data } = await defaultClient.get<ResponseRootType<null>>(
    USER.validateNickname,
    {
      params: {
        nickname,
      },
    },
  );

  return {
    isValid: data.code === 204,
    message: data.message,
  };
};

const useGetValidateNickName = (nickname: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [USER.validateNickname, nickname],
    queryFn: () => getValidateNickname(nickname),
    enabled: nickname.trim() !== '',
  });

  const hasData = !!data;

  const validResult = hasData
    ? { isValid: data.isValid, message: data.message }
    : { isValid: false, message: '' };

  return { isLoading, ...validResult };
};

export default useGetValidateNickName;
