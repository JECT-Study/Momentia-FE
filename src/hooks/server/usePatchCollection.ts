import { useMutation } from '@tanstack/react-query';

import patchCollection from '@/apis/collection/patchCollection';
import useToastStore from '@/stores/useToastStore';
import { PatchCollectionParams } from '@/types/collection';

const usePatchCollection = () => {
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: ({ collectionId, data }: PatchCollectionParams) => {
      return patchCollection({ collectionId, data });
    },
    onSuccess: () => showToast('success', '컬렉션이 수정되었습니다.'),
    onError: (error) => {
      if (error instanceof Error) {
        if (error.message === '컬렉션이 수정되지 않았습니다.') {
          showToast('error', error.message);
        } else {
          console.error(error.message);
        }
      }
    },
  });
};

export default usePatchCollection;
