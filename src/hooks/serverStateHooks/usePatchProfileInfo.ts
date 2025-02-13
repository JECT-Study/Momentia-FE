import { useMutation, useQueryClient } from '@tanstack/react-query';

import updateProfileInfo from '@/apis/user/updateProfileInfo';
import { USER } from '@/constants/API';
import TokenHandler from '@/utils/tokenHandler';

const usePatchProfileInfo = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUserProfile, isPending } = useMutation({
    mutationFn: updateProfileInfo,
    onError: (error) => {
      alert(`프로필 업데이트 실패: ${error.message}`);
    },
    onSuccess: () => {
      const userId = TokenHandler.getUserIdFromToken();

      queryClient.invalidateQueries({
        queryKey: [USER.userProfile, userId],
      });
    },
  });

  return { updateUserProfile, isPending };
};

export default usePatchProfileInfo;
