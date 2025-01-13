import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import postSignUp from '@/apis/auth/signUp';
import { USER } from '@/constants/API';
import {
  COMMON_ERROR_MESSAGE,
  SIGNUP_ERROR_MESSAGE,
} from '@/constants/errorMessage';
import ROUTE from '@/constants/routes';
import { SignUpFormType } from '@/types/auth';
import { ErrorResponseType } from '@/types/errorResponse';

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
