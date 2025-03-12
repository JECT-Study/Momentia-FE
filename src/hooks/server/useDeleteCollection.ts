import { useMutation } from '@tanstack/react-query';

import deleteCollection from '@/apis/collection/deleteCollection';
import useToastStore from '@/stores/useToastStore';

const useDeleteCollection = () => {
  const { showToast } = useToastStore();

  const { mutate } = useMutation({
    mutationFn: (collectionId: number) => deleteCollection(collectionId),
    onSuccess: () => showToast('success', '컬렉션이 삭제되었습니다.'),
    onError: (error) => {
      if (error instanceof Error) {
        if (error.message === '컬렉션 삭제에 실패하였습니다.') {
          showToast('error', error.message);
        } else {
          console.error(error.message);
        }
      }
    },
  });

  return { mutate };
};

export default useDeleteCollection;
