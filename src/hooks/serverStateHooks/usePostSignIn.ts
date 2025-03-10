import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import postSignIn from '@/apis/auth/signIn';
import { USER } from '@/constants/API';
import ROUTE from '@/constants/routes';
import useToastStore from '@/stores/useToastStore';
import { SignInFormType } from '@/types/auth';
import TokenHandler from '@/utils/tokenHandler';

const usePostSignIn = () => {
  const router = useRouter();
  const { showToast } = useToastStore();

  return useMutation({
    mutationKey: [USER.signIn],
    mutationFn: (formData: SignInFormType) => postSignIn(formData),
    onSuccess: (data) => {
      TokenHandler.setToken(data);
      router.push(ROUTE.home);
    },
    onError: (error) => {
      showToast('error', error.message);
    },
  });
};

export default usePostSignIn;
