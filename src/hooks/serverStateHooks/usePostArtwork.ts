import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import postArtwork from '@/apis/artwork/postArtwork';
import ROUTE from '@/constants/routes';
import useToastStore from '@/stores/useToastStore';

const usePostArtwork = () => {
  const router = useRouter();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: postArtwork,
    onSuccess: (data) => {
      showToast('success', '작품이 업로드되었습니다.');
      router.push(`${ROUTE.artworkDetail}?postId=${data.postId}`);
    },
    onError: (error) => {
      if (error instanceof Error) {
        if (error.message === '작품이 업로드되지 않았습니다.') {
          showToast('error', error.message);
        } else {
          console.error(error.message);
        }
      }
    },
  });
};

export default usePostArtwork;
