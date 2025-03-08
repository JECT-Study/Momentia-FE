import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import deleteArtworkLike from '@/apis/artwork/deleteArtworkLike';
import postArtworkLike from '@/apis/artwork/postArtworkLike';
import useToastStore from '@/stores/useToastStore';

interface UseToggleLikeProps {
  isLiked: boolean;
  likeCount: number;
}

const useToggleLike = (initialLikeStatus: UseToggleLikeProps) => {
  const [likeStatus, setLikeStatus] = useState(initialLikeStatus);

  const { isLiked, likeCount } = likeStatus;
  const { showToast } = useToastStore();

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
      showToast('success', '좋아요 상태가 변경되었습니다.');
    },

    onError: (error) => {
      if (error instanceof Error) {
        if (
          error.message === '좋아요가 취소되지 않았습니다.' ||
          error.message === '좋아요가 반영되지 않았습니다.'
        ) {
          showToast('error', error.message);
        } else {
          console.error(error.message);
        }
      }
    },
  });

  return { mutate, ...likeStatus, setLikeStatus };
};

export default useToggleLike;
