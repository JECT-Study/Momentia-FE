import { useMutation } from '@tanstack/react-query';

import deleteCollection from '@/apis/collection/deleteCollection';

const useDeleteCollection = () => {
  const { mutate } = useMutation({
    mutationFn: (collectionId: number) => deleteCollection(collectionId),
  });

  return { mutate };
};

export default useDeleteCollection;
