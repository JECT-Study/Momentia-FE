import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ARTWORK } from '@/constants/API';
import useToastStore from '@/stores/useToastStore';

import postComment from '../../apis/artwork/postComment';

interface MutateProps {
  postId: number;
  content: string;
}

const usePostComment = (postId: number) => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  const { mutate } = useMutation({
    mutationFn: ({ postId, content }: MutateProps) =>
      postComment({ postId, content }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ARTWORK.artworkPostComments(postId)],
      });
      showToast('success', '댓글이 작성되었습니다.');
    },

    onError: (error) => {
      if (error instanceof Error) {
        if (error.message === '댓글이 작성되지 않았습니다.') {
          showToast('error', error.message);
        } else {
          console.error(error.message);
        }
      }
    },
  });

  return { mutate };
};

export default usePostComment;
