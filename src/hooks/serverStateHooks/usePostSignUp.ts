import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import postSignUp from '@/apis/auth/signUp';
import { USER } from '@/constants/API';
import ROUTE from '@/constants/routes';
import useToastStore from '@/stores/useToastStore';
import { SignUpFormType } from '@/types/auth';

const usePostSignUp = () => {
  const router = useRouter();
  const { showToast } = useToastStore();

  return useMutation({
    mutationKey: [USER.signUp],
    mutationFn: (formData: SignUpFormType) => postSignUp(formData),
    onSuccess: () => router.push(ROUTE.signIn),
    onError: (error) => {
      showToast('error', error.message);
    },
  });
};

export default usePostSignUp;
