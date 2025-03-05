import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import deleteCollectionArtwork from '@/apis/collection/deleteCollectionArtwork';
import useToastStore from '@/stores/useToastStore';

const useDeleteCollectionArtwork = () => {
  const searchParams = useSearchParams();
  const collectionId = Number(searchParams.get('collectionId'));

  const { showToast } = useToastStore();

  const { mutate } = useMutation({
    mutationFn: (postId: number) =>
      deleteCollectionArtwork({ collectionId, postId }),
    onSuccess: () => showToast('success', '작품이 삭제되었습니다.'),
    onError: (error) => {
      if (error instanceof Error) {
        if (error.message === '작품이 삭제되지 않았습니다.') {
          showToast('error', error.message);
        } else {
          console.error(error.message);
        }
      }
    },
  });

  return { mutate };
};

export default useDeleteCollectionArtwork;
