import { useMutation } from '@tanstack/react-query';

import patchArtwork from '@/apis/artwork/patchArtwork';
import useToastStore from '@/stores/useToastStore';
import { PatchArtworkData } from '@/types';

interface PatchArtworkParams {
  postId: number;
  data: PatchArtworkData;
}

const usePatchArtwork = () => {
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: ({ postId, data }: PatchArtworkParams) => {
      return patchArtwork(postId, data);
    },
    onSuccess: () => {
      showToast('success', '작품이 수정되었습니다.');
    },
    onError: () => {
      showToast('error', '작품 수정에 실패했습니다.');
    },
  });
};

export default usePatchArtwork;
