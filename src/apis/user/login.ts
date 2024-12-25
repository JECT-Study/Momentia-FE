import { USER } from '@/constants/API';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import defaultClient from '..';

const postLogin = async (formData: LoginFormType) => {
  const { data } = await defaultClient.post<ResponseRootType<DefaultAuthType>>(
    USER.login,
    formData,
  );

  return data;
};

const usePostLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: [USER.login],
    mutationFn: (formData: LoginFormType) => postLogin(formData),
    onSuccess: () => router.push('/'),
  });
};

export default usePostLogin;
