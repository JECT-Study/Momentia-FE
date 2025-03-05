import { useMutation } from '@tanstack/react-query';

import patchArtworkComment from '@/apis/artwork/patchArtworkComment';
import useToastStore from '@/stores/useToastStore';

interface MutateProps {
  content: string;
  commentId: number;
}

const usePatchArtworkComment = () => {
  const { showToast } = useToastStore();

  const { mutate } = useMutation({
    mutationFn: ({ content, commentId }: MutateProps) =>
      patchArtworkComment(commentId, content),
    onSuccess: () => showToast('success', '댓글이 수정되었습니다.'),
    onError: (error) => {
      if (error instanceof Error) {
        if (error.message === '댓글이 수정되지 않았습니다.') {
          showToast('error', error.message);
        } else {
          console.error(error.message);
        }
      }
    },
  });

  return { mutate };
};

export default usePatchArtworkComment;
