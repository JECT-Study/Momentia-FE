import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import deleteArtworkLike from '@/apis/artwork/deleteArtworkLike';
import postArtworkLike from '@/apis/artwork/postArtworkLike';

interface UseToggleLikeProps {
  isLiked: boolean;
  likeCount: number;
}

const useToggleLike = (initialLikeStatus: UseToggleLikeProps) => {
  const [likeStatus, setLikeStatus] = useState(initialLikeStatus);
  const { isLiked, likeCount } = likeStatus;
  const { mutate } = useMutation<void, Error, number>({
    mutationFn: async (postId: number) => {
      isLiked === true
        ? await deleteArtworkLike(postId)
        : await postArtworkLike(postId);
    },

    onSuccess: () => {
      setLikeStatus({
        isLiked: !isLiked,
        likeCount: isLiked ? likeCount - 1 : likeCount + 1,
      });
    },

    onError: (error) => {
      console.error('팔로우 상태 변경 에러: ', error.message);
    },
  });

  return { mutate, ...likeStatus, setLikeStatus };
};

export default useToggleLike;
