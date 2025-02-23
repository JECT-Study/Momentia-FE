import { useMutation } from '@tanstack/react-query';

import patchArtworkComment from '@/apis/artwork/patchArtworkComment';

interface MutateProps {
  content: string;
  commentId: number;
}

const usePatchArtworkComment = () => {
  const { mutate } = useMutation({
    mutationFn: ({ content, commentId }: MutateProps) =>
      patchArtworkComment(commentId, content),
  });

  return { mutate };
};

export default usePatchArtworkComment;
