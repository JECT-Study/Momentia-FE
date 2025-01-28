import { QueryClient } from '@tanstack/react-query';

import { ARTWORK } from '@/constants/API';
import { CommentControllerProps } from '@/types/comment';

import useDeleteComments from '../../../../hooks/serverStateHooks/useDeleteComment';

const CommentDefault = ({
  comment,
  postId,
  setIsEditMode,
}: CommentControllerProps) => {
  const queryClient = new QueryClient();

  const { content, commentId, isMine } = comment;

  const { mutate: deleteComment } = useDeleteComments(commentId);

  const clickEditButton = () => {
    setIsEditMode(true);
  };

  const clickDeleteButton = () => {
    deleteComment(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === ARTWORK.artworkPostComments(postId),
        });

        // 토스트 메세지로 수정
        alert('댓글 삭제 성공');
      },
    });
  };

  return (
    <>
      <p className='body2'>{content}</p>

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
