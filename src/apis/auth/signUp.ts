import { USER } from '@/constants/API';
import { SIGNUP_ERROR_MESSAGE } from '@/constants/errorMessage';

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
    onSuccess: () => router.push('/'),
    onError: (error) => {
      if (isAxiosError<ErrorResponseType<null>>(error) && error.response) {
        const { code } = error;

        if (code) console.error(SIGNUP_ERROR_MESSAGE[code]);
        else
          console.error('알 수 없는 에러가 발생했습니다. 다시 시도해주세요.');
      } else {
        console.error(
          '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.',
        );
      }
    },
  });
};

export default usePostSignUp;
