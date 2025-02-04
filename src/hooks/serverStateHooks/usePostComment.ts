import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ARTWORK } from '@/constants/API';

import postComment from '../../apis/artwork/postComment';

interface MutateProps {
  postId: number;
  content: string;
}

const usePostComment = (postId: number) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ postId, content }: MutateProps) =>
      postComment({ postId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ARTWORK.artworkPostComments(postId)],
      });
      alert('댓글 생성 성공');
    },
  });

  return { mutate };
};

export default usePostComment;
