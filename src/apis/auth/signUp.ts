import { USER } from '@/constants/API';
import {
  COMMON_ERROR_MESSAGE,
  SIGNUP_ERROR_MESSAGE,
} from '@/constants/errorMessage';
import ROUTE from '@/constants/routes';
import { AuthTokenType, SignUpFormType } from '@/types/auth';

import defaultClient from '..';

import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';

const postSignUp = async (formData: SignUpFormType) => {
  const { data } = await defaultClient.post<AuthTokenType>(
    USER.signUp,
    formData,
  );

  return data;
};

const usePostSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: [USER.signUp],
    mutationFn: (formData: SignUpFormType) => postSignUp(formData),
    onSuccess: () => router.push(ROUTE.signIn),
    onError: (error) => {
      if (isAxiosError<ErrorResponseType<null>>(error) && error.response) {
        const { code } = error;

        if (code) console.error(SIGNUP_ERROR_MESSAGE[code]);
        else console.error(COMMON_ERROR_MESSAGE.UNKNOWN_ERROR);
      } else {
        console.error(COMMON_ERROR_MESSAGE.NETWORK_ERROR);
      }
    },
  });
};

export default usePostSignUp;
