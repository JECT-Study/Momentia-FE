import { useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/useToastStore';

import deleteArtworkComments from '../../apis/artwork/deleteArtworkComments';

const useDeleteComments = () => {
  const { showToast } = useToastStore();

  const { mutate } = useMutation({
    mutationFn: (commentId: number) => deleteArtworkComments(commentId),
    onSuccess: () => showToast('success', '댓글이 삭제되었습니다.'),
    onError: (error) => {
      if (error instanceof Error) {
        if (error.message === '댓글이 삭제되지 않았습니다.') {
          showToast('error', error.message);
        } else {
          console.error(error.message);
        }
      }
    },
  });

  return { mutate };
};

export default useDeleteComments;
