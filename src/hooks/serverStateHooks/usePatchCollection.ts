import { useMutation } from '@tanstack/react-query';

import patchCollection from '@/apis/collection/patchCollection';
import { PatchCollectionParams } from '@/types/collection';

const usePatchCollection = () => {
  return useMutation({
    mutationFn: ({ collectionId, data }: PatchCollectionParams) => {
      return patchCollection({ collectionId, data });
    },
    onError: (error) => {
      console.error('컬렉션 수정 실패: ', error);
    },
  });
};

export default usePatchCollection;
