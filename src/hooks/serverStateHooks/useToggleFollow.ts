import deleteFollow from '@/apis/follow/deleteFollow';
import postFollow from '@/apis/follow/postFollow';

import { ARTWORK } from '@/constants/API';

import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ToggleFollowParams {
  isFollowing: boolean;
  setIsFollowing: (value: boolean) => void;
}

const useToggleFollow = ({
  isFollowing,
  setIsFollowing,
}: ToggleFollowParams) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (userId: number) => {
      isFollowing === true
        ? await deleteFollow(userId)
        : await postFollow(userId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ARTWORK.followedArtists],
      });
      setIsFollowing(!isFollowing);
    },

    onError: (error) => {
      console.error('팔로우 상태 변경 에러: ', error.message);
    },
  });
};

export default useToggleFollow;
