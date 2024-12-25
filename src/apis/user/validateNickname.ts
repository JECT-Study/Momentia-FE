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

const useGetValidateNickName = (nickName: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [USER.validateNickname, nickName],
    queryFn: () => getValidateNickname(nickName),
    enabled: nickName.trim() !== '',
  });

  const hasData = !!data;

  const validInfo = hasData
    ? { isValid: data.isValid, message: data.message }
    : { isValid: false, message: '' };

  return { isLoading, ...validInfo };
};

export default useGetValidateNickName;
