import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import deleteFollow from '@/apis/follow/deleteFollow';
import postFollow from '@/apis/follow/postFollow';
import { ARTWORK, USER } from '@/constants/API';
import TokenHandler from '@/utils/tokenHandler';

interface TogglePropsType {
  userId: number;
  following: boolean;
}

interface MutationContextType {
  prevFollowStatus: boolean | null;
}

const useToggleFollow = ({
  initFollowState,
}: {
  initFollowState: boolean | null;
}) => {
  const [isFollowing, setIsFollowing] = useState(initFollowState);
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsFollowing(initFollowState);
  }, [initFollowState]);

  const mutation = useMutation<
    void,
    Error,
    TogglePropsType,
    MutationContextType
  >({
    mutationFn: async ({ userId, following }) => {
      following ? await deleteFollow(userId) : await postFollow(userId);
    },

    onMutate: async ({ following }) => {
      await queryClient.cancelQueries();

      const prevFollowStatus = isFollowing;
      setIsFollowing(!following);

      return { prevFollowStatus };
    },

    onSuccess: () => {
      const currentUserId = TokenHandler.getUserIdFromToken();

      if (currentUserId) {
        [
          ARTWORK.followedArtists,
          USER.followerList(currentUserId),
          USER.followingList(currentUserId),
        ].forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
        });
      }
    },

    onError: (error, _, context) => {
      console.error('팔로우 상태 변경 에러: ', error.message);

      if (context?.prevFollowStatus !== undefined) {
        setIsFollowing(context.prevFollowStatus);
      }
    },
  });

  const toggleFollow = (userId: number) => {
    if (isFollowing !== null)
      mutation.mutate({ userId, following: isFollowing });
  };

  return { isFollowing, toggleFollow };
};

export default useToggleFollow;
