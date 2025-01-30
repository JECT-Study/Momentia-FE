import { useMutation } from '@tanstack/react-query';

import postCreateComment from '../../apis/artwork/postCreateComment';

interface MutateProps {
  postId: number;
  content: string;
}

const usePostCreateComment = () => {
  const { mutate } = useMutation({
    mutationFn: ({ postId, content }: MutateProps) =>
      postCreateComment({ postId, content }),
    onSuccess: () => {
      alert('댓글 생성 성공');
    },
  });

  return { mutate };
};

export default usePostCreateComment;
