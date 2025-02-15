import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import deleteFollow from '@/apis/follow/deleteFollow';
import postFollow from '@/apis/follow/postFollow';
import { ARTWORK, USER } from '@/constants/API';
import TokenHandler from '@/utils/tokenHandler';

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
    { userId: number; following: boolean }
  >({
    mutationFn: async ({ userId, following }) => {
      following ? await deleteFollow(userId) : await postFollow(userId);
    },

    onSuccess: (_, { following }) => {
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

      setIsFollowing(!following);
    },

    onError: (error) => {
      console.error('팔로우 상태 변경 에러: ', error.message);
    },
  });

  const toggleFollow = (userId: number) => {
    if (isFollowing !== null)
      mutation.mutate({ userId, following: isFollowing });
  };

  return { isFollowing, toggleFollow };
};

export default useToggleFollow;
