import { useMutation, useQueryClient } from '@tanstack/react-query';

import deleteFollow from '@/apis/follow/deleteFollow';
import postFollow from '@/apis/follow/postFollow';
import { ARTWORK, USER } from '@/constants/API';
import TokenHandler from '@/utils/tokenHandler';

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
      const currentUserId = TokenHandler.getUserIdFromToken();

      if (currentUserId)
        [
          ARTWORK.followedArtists,
          USER.followerList(currentUserId),
          USER.followingList(currentUserId),
        ].forEach((queryKey) => {
          queryClient.invalidateQueries({
            queryKey: [queryKey],
          });
        });

      setIsFollowing(!isFollowing);
    },

    onError: (error) => {
      console.error('팔로우 상태 변경 에러: ', error.message);
    },
  });
};

export default useToggleFollow;
