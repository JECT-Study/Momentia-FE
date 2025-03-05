import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import deleteFollow from '@/apis/follow/deleteFollow';
import postFollow from '@/apis/follow/postFollow';
import { ARTWORK, USER } from '@/constants/API';
import useToastStore from '@/stores/useToastStore';
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
  const { showToast } = useToastStore();

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

      setIsFollowing(!isFollowing);
      showToast('success', '팔로우 상태가 변경되었습니다.');
    },

    onError: (error, _, context) => {
      if (error instanceof Error) {
        if (
          error.message === '팔로우가 취소되지 않았습니다.' ||
          error.message === '팔로우가 반영되지 않았습니다.'
        ) {
          showToast('error', error.message);
        } else {
          console.error(error.message);
        }
      }

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
