import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import postSignIn from '@/apis/auth/signIn';
import { USER } from '@/constants/API';
import {
  COMMON_ERROR_MESSAGE,
  SIGNIN_ERROR_MESSAGE,
} from '@/constants/errorMessage';
import ROUTE from '@/constants/routes';
import { SignInFormType } from '@/types/auth';
import { ErrorResponseType } from '@/types/errorResponse';
import TokenHandler from '@/utils/tokenHandler';

const usePostSignIn = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: [USER.signIn],
    mutationFn: (formData: SignInFormType) => postSignIn(formData),
    onSuccess: (data) => {
      TokenHandler.setToken(data);
      router.push(ROUTE.home);
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
