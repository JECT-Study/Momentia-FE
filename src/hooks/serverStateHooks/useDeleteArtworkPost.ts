import { useMutation } from '@tanstack/react-query';

import deleteArtworkPost from '@/apis/artwork/deleteArtworkPost';
import { ARTWORK } from '@/constants/API';

const useDeleteArtworkPost = (postId: number) => {
  const { mutate } = useMutation({
    mutationKey: [ARTWORK.artworkPost, postId],
    mutationFn: () => deleteArtworkPost(postId),
  });

  return { mutate };
};

export default useDeleteArtworkPost;
