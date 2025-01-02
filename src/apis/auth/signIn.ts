import { USER } from '@/constants/API';
import {
  COMMON_ERROR_MESSAGE,
  SIGNIN_ERROR_MESSAGE,
} from '@/constants/errorMessage';
import { AuthTokenType, SignInFormType } from '@/types/auth';

import TokenHandler from '@/utils/tokenHandler';
import defaultClient from '..';

import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';

const postSignIn = async (formData: SignInFormType) => {
  const { data } = await defaultClient.post<AuthTokenType>(
    USER.signIn,
    formData,
  );

  return data;
};

const usePostSignIn = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: [USER.signIn],
    mutationFn: (formData: SignInFormType) => postSignIn(formData),
    onSuccess: (data) => {
      TokenHandler.setToken(data);
      router.push('/');
    },
    onError: (error) => {
      if (isAxiosError<ErrorResponseType<null>>(error) && error.response) {
        const { code } = error;

        if (code) console.error(SIGNIN_ERROR_MESSAGE[code]);
        else console.error(COMMON_ERROR_MESSAGE.UNKNOWN_ERROR);
      } else {
        console.error(COMMON_ERROR_MESSAGE.NETWORK_ERROR);
      }
    },
  });
};

export default usePostSignIn;
