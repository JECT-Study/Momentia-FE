import { useMutation } from '@tanstack/react-query';

import patchArtwork from '@/apis/artwork/patchArtwork';
import { PatchCollectionProps } from '@/types/collection';

const usePatchCollection = () => {
  return useMutation({
    mutationFn: ({ collectionId, data }: PatchCollectionProps) => {
      return patchArtwork(collectionId, data);
    },
    onError: (error) => {
      console.error('컬렉션 수정 실패: ', error);
    },
  });
};

export default usePatchCollection;
