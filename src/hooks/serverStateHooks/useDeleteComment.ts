import { useMutation } from '@tanstack/react-query';

import { ARTWORK } from '@/constants/API';

import deleteArtworkComments from '../../apis/artwork/deleteArtworkComments';

const useDeleteComments = (commentId: number) => {
  const { mutate } = useMutation({
    mutationKey: [ARTWORK.artworkComment(commentId)],
    mutationFn: () => deleteArtworkComments(commentId),
  });

  return { mutate };
};

export default useDeleteComments;
