import { useMutation } from '@tanstack/react-query';

import deleteArtwork from '@/apis/artwork/deleteArtwork';
import useToastStore from '@/stores/useToastStore';

const useDeleteArtwork = () => {
  const { showToast } = useToastStore();

  const { mutate } = useMutation({
    mutationFn: (postId: number) => deleteArtwork(postId),
    onSuccess: () => showToast('success', '작품이 삭제되었습니다.'),
    onError: (error) => {
      if (error instanceof Error) {
        if (error.message === '작품이 삭제되지 않았습니다.') {
          showToast('error', error.message);
        } else {
          console.error(error.message);
        }
      }
    },
  });

  return { mutate };
};

export default useDeleteArtwork;
