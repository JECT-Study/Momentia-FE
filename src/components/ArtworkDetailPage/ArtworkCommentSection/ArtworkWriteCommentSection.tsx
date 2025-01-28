import { ChangeEvent, useState } from 'react';

import SquareButtonL from '@/components/Button/SquareButtonL';
import BasicInput from '@/components/Input/BasicInput';
import usePostCreateComment from '@/hooks/serverStateHooks/usePostCreateComment';

const ArtworkWriteCommentSection = ({ postId }: { postId: number }) => {
  const { mutate: createComment } = usePostCreateComment(postId);

  const [comment, setComment] = useState('');

  const changeComment = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event?.target.value);
  };

  const submitComment = () => {
    createComment(comment);
  };

  return (
    <div className='grid grid-cols-[1fr_100px] gap-x-2.5'>
      <BasicInput
        value={comment}
        onChange={changeComment}
        placeholder='작품에 대한 댓글을 남겨주세요.'
        faededBackground={true}
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
