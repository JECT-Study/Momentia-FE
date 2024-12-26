import { USER } from '@/constants/API';
import {
  COMMON_ERROR_MESSAGE,
  NICKNAME_VALIDATE_ERROR_MESSAGE,
} from '@/constants/errorMessage';
import defaultClient from '..';

import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

const getValidateNickname = async (nickname: string) => {
  try {
    const response = await defaultClient.get<null>(USER.validateEmail, {
      params: {
        nickname,
      },
    });

    return {
      isValid: response.status === 204,
      message: '',
    };
  } catch (error) {
    if (isAxiosError<ErrorResponseType<null>>(error) && error.response) {
      const { code } = error;

      if (code) console.error(NICKNAME_VALIDATE_ERROR_MESSAGE[code]);
      else console.error(COMMON_ERROR_MESSAGE.UNKNOWN_ERROR);
    } else {
      console.error(COMMON_ERROR_MESSAGE.NETWORK_ERROR);
    }
  }
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
