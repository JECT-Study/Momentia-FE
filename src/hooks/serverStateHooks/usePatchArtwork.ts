import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import patchArtwork from '@/apis/artwork/patchArtwork';
import ROUTE from '@/constants/routes';
import { PatchArtworkData } from '@/types';

interface PatchArtworkParams {
  postId: number;
  data: PatchArtworkData;
}

const usePatchArtwork = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ postId, data }: PatchArtworkParams) => {
      return patchArtwork(postId, data);
    },
    onSuccess: (postId) => {
      router.push(`${ROUTE.artworkDetail}?postId=${postId}`);
    },
    onError: (error) => {
      console.error('작품 수정 실패: ', error);
    },
  });
};

export default usePatchArtwork;
