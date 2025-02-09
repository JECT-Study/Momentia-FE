import { useMutation } from '@tanstack/react-query';

import deleteArtwork from '@/apis/artwork/deleteArtwork';

const useDeleteArtwork = () => {
  const { mutate } = useMutation({
    mutationFn: (postId: number) => deleteArtwork(postId),
  });

  return { mutate };
};

export default useDeleteArtwork;
