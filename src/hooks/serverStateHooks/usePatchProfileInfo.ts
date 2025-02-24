import { useMutation, useQueryClient } from '@tanstack/react-query';

import updateProfileInfo from '@/apis/user/updateProfileInfo';
import { USER } from '@/constants/API';
import useToastStore from '@/stores/useToastStore';
import TokenHandler from '@/utils/tokenHandler';

const usePatchProfileInfo = () => {
  const queryClient = useQueryClient();

  const { showToast } = useToastStore();

  const { mutate: updateUserProfile, isPending } = useMutation({
    mutationFn: updateProfileInfo,
    onSuccess: () => {
      const userId = TokenHandler.getUserIdFromToken();

      queryClient.invalidateQueries({
        queryKey: [USER.userProfile, userId],
      });

      showToast('success', '프로필이 수정되었습니다.');
    },
    onError: (error) => {
      showToast('success', '프로필이 수정되지 않았습니다.');
      console.error(error.message);
    },
  });

  return { updateUserProfile, isPending };
};

export default usePatchProfileInfo;
