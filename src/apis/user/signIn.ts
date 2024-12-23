import { USER } from '@/constants/API';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import defaultClient from '..';

const postSignIn = async (formData: SignInFormType) => {
  const { data } = await defaultClient.post<ResponseRootType<AuthTokenType>>(
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
    onSuccess: () => router.push('/'),
  });
};

export default usePostSignIn;
