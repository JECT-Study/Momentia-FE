import { USER } from '@/constants/API';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import defaultClient from '..';

const postSignUp = async (formData: SignUpFormType) => {
  const { data } = await defaultClient.post<ResponseRootType<DefaultAuthType>>(
    USER.signup,
    formData,
  );

  return data;
};

const usePostSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: [USER.signup],
    mutationFn: (formData: SignUpFormType) => postSignUp(formData),
    onSuccess: () => router.push('/'),
  });
};

export default usePostSignUp;
