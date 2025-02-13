import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import postArtwork from '@/apis/artwork/postArtwork';
import ROUTE from '@/constants/routes';

const usePostArtwork = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: postArtwork,
    onError: (error) => {
      console.error('작품 업로드 중 에러 발생: ', error);
    },
    onSuccess: (data) => {
      router.push(`${ROUTE.artworkDetail}?postId=${data.postId}`);
    },
  });
};

export default usePostArtwork;
