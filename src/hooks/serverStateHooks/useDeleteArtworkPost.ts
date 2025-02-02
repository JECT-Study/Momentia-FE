import { useMutation } from '@tanstack/react-query';

import deleteArtworkPost from '@/apis/artwork/deleteArtworkPost';

const useDeleteArtworkPost = () => {
  const { mutate } = useMutation({
    mutationFn: (postId: number) => deleteArtworkPost(postId),
  });

  return { mutate };
};

export default useDeleteArtworkPost;
