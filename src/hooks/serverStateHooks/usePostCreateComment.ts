import { useMutation } from '@tanstack/react-query';

import { ARTWORK } from '@/constants/API';

import postCreateComment from '../../apis/artwork/postCreateComment';

const usePostCreateComment = (postId: number) => {
  const { mutate } = useMutation({
    mutationKey: [ARTWORK.artworkPostComment(postId)],
    mutationFn: (content: string) => postCreateComment({ postId, content }),
    onSuccess: () => {
      alert('댓글 생성 성공');
    },
  });

  return { mutate };
};

export default usePostCreateComment;
