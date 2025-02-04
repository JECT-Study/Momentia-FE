import { useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';

import OvalButton from '@/components/Button/OvalButton';
import Textarea from '@/components/Input/Textarea';
import { ARTWORK } from '@/constants/API';
import usePatchArtworkComment from '@/hooks/serverStateHooks/usePatchArtworkComment';
import { CommentControllerProps } from '@/types/comment';

const CommentEdit = ({
  comment,
  postId,
  setIsEditMode,
}: CommentControllerProps) => {
  const queryClient = useQueryClient();

  const { content, commentId } = comment;

  const { mutate: editComment } = usePatchArtworkComment();

  const [commentText, setCommentText] = useState(content);

  const changeCommentText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(event.target.value);
  };

  const cancelEditMode = () => {
    setIsEditMode(false);
  };

  const clickEditButton = () => {
    editComment(
      {
        content: commentText,
        commentId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [ARTWORK.artworkPostComments(postId)],
          });
          setIsEditMode(false);

          // 토스트 메세지 적용
          alert('댓글 수정 성공');
        },
      },
    );
  };

  return (
    <>
      <Textarea
        value={commentText}
        onChange={changeCommentText}
        fadedBackground={true}
      />
      <div className='flex justify-end gap-2.5'>
        <OvalButton
          disabled={commentText.length === 0}
          buttonSize={'s'}
          variant={'primary'}
          className='!bg-gray-900'
          onClick={cancelEditMode}
        >
          <p className='button-s'>취소</p>
        </OvalButton>
        <OvalButton
          disabled={commentText.length === 0}
          buttonSize={'s'}
          variant={'primary'}
          onClick={clickEditButton}
        >
          <p className='button-s'>완료</p>
        </OvalButton>
      </div>
    </>
  );
};

export default CommentEdit;
