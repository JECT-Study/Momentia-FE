import { USER } from '@/constants/API';
import {
  COMMON_ERROR_MESSAGE,
  EMAIL_VALIDATE_ERROR_MESSAGE,
} from '@/constants/errorMessage';
import defaultClient from '..';

import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

const getValidateEmail = async (email: string) => {
  try {
    const response = await defaultClient.get<null>(USER.validateEmail, {
      params: {
        email,
      },
    });

    return {
      isValid: response.status === 204,
      message: '',
    };
  } catch (error) {
    if (isAxiosError<ErrorResponseType<null>>(error) && error.response) {
      const { code } = error;

      if (code) console.error(EMAIL_VALIDATE_ERROR_MESSAGE[code]);
      else console.error(COMMON_ERROR_MESSAGE.UNKNOWN_ERROR);
    } else {
      console.error(COMMON_ERROR_MESSAGE.NETWORK_ERROR);
    }
  }
};

const useGetValidateEmail = (email: string, mode: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [USER.validateEmail, email],
    queryFn: () => getValidateEmail(email),
    enabled: email.trim() !== '' && mode === 'sign-up',
  });

  const hasData = !!data;

  const validInfo = hasData
    ? { isValid: data.isValid, message: data.message }
    : { isValid: false, message: '' };

  return { isLoading, error, ...validInfo };
};

export default useGetValidateEmail;
