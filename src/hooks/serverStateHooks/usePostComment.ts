import { useMutation } from '@tanstack/react-query';

import postComment from '../../apis/artwork/postComment';

interface MutateProps {
  postId: number;
  content: string;
}

const usePostComment = () => {
  const { mutate } = useMutation({
    mutationFn: ({ postId, content }: MutateProps) =>
      postComment({ postId, content }),
    onSuccess: () => {
      alert('댓글 생성 성공');
    },
  });

  return { mutate };
};

export default usePostComment;
