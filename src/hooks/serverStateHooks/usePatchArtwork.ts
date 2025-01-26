import { useMutation } from '@tanstack/react-query';

import patchArtwork from '@/apis/artwork/patchArtwork';
import { PatchArtworkData } from '@/types';

interface PatchArtworkParams {
  postId: number;
  data: PatchArtworkData;
}

const usePatchArtwork = () => {
  return useMutation({
    mutationFn: ({ postId, data }: PatchArtworkParams) => {
      return patchArtwork(postId, data);
    },
    onSuccess: (data, postId) => {
      window.location.href = `/artwork/detail/${postId}`; // 상세 페이지 경로 상수와 겹칠 듯하여 상수화 보류
    },
    onError: (error) => {
      console.error('작품 수정 실패: ', error);
    },
  });
};

export default usePatchArtwork;
