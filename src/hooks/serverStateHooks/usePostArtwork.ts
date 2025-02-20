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
    onError: () => {
      showToast('error', '작품 업로드에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};

export default usePostArtwork;
