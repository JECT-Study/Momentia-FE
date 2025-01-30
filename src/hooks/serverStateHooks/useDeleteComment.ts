import { useMutation } from '@tanstack/react-query';

import deleteArtworkComments from '../../apis/artwork/deleteArtworkComments';

const useDeleteComments = () => {
  const { mutate } = useMutation({
    mutationFn: (commentId: number) => deleteArtworkComments(commentId),
  });

  return { mutate };
};

export default useDeleteComments;
