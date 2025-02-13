import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import deleteCollectionArtwork from '@/apis/collection/deleteCollectionArtwork';

const useDeleteCollectionArtwork = () => {
  const searchParams = useSearchParams();
  const collectionId = Number(searchParams.get('collectionId'));

  const { mutate } = useMutation({
    mutationFn: (postId: number) =>
      deleteCollectionArtwork({ collectionId, postId }),
  });

  return { mutate };
};

export default useDeleteCollectionArtwork;
