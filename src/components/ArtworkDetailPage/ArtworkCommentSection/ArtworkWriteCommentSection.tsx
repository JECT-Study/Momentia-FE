import { ChangeEvent, useState } from 'react';

import SquareButtonL from '@/components/Button/SquareButtonL';
import BasicInput from '@/components/Input/BasicInput';
import usePostComment from '@/hooks/serverStateHooks/usePostComment';

const ArtworkWriteCommentSection = ({ postId }: { postId: number }) => {
  const { mutate: createComment } = usePostComment();

  const [comment, setComment] = useState('');

  const changeComment = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event?.target.value);
  };

  const submitComment = () => {
    createComment({ postId, content: comment });
  };

  return (
    <div className='grid grid-cols-[1fr_100px] gap-x-2.5'>
      <BasicInput
        value={comment}
        onChange={changeComment}
        placeholder='작품에 대한 댓글을 남겨주세요.'
        commentBackground={true}
      />
      <span className='h-[60px]'>
        <SquareButtonL variant={'tertiary'} onClick={submitComment}>
          댓글 작성
        </SquareButtonL>
      </span>
    </div>
  );
};

export default ArtworkWriteCommentSection;
