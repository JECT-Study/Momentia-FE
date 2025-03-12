import { useQueryClient } from '@tanstack/react-query';

import { ARTWORK } from '@/constants/API';
import { CommentControllerProps } from '@/types/comment';

import useDeleteComments from '../../../../hooks/server/useDeleteComment';

const CommentDefault = ({
  comment,
  postId,
  setIsEditMode,
}: CommentControllerProps) => {
  const queryClient = useQueryClient();

  const { content, commentId, isMine } = comment;

  const { mutate: deleteComment } = useDeleteComments();

  const clickEditButton = () => {
    setIsEditMode(true);
  };

  const clickDeleteButton = () => {
    deleteComment(commentId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ARTWORK.artworkPostComments(postId)],
        });
      },
    });
  };

  return (
    <>
      <p className='body2 whitespace-pre'>{content}</p>

      {isMine && (
        <div className='flex justify-end gap-[31px] body2 mt-2.5'>
          <button type='button' onClick={clickEditButton}>
            수정
          </button>
          <button type='button' onClick={clickDeleteButton}>
            삭제
          </button>
        </div>
      )}
    </>
  );
};

export default CommentDefault;
