import { useMutation } from '@tanstack/react-query';

import patchArtworkComment from '@/apis/artwork/patchArtwokrComment';
import { ARTWORK } from '@/constants/API';

const usePatchArtworkComment = (commentId: number, postId: number) => {
  const { mutate } = useMutation({
    mutationKey: [ARTWORK.artworkComment(commentId)],
    mutationFn: (content: string) => patchArtworkComment(commentId, content),
  });

  return { mutate };
};

export default usePatchArtworkComment;
