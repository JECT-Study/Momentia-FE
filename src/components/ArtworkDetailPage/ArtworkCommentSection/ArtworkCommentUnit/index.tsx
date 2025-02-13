import Image from 'next/image';
import { Ref, useState } from 'react';

import { CommonCommentProps } from '@/types/comment';
import timeFormatter from '@/utils/timeFormatter';

import CommentDefault from './CommentDefault';
import CommentEdit from './CommentEdit';

interface ArtworkCommentUnitProps extends CommonCommentProps {
  ref: Ref<HTMLDivElement | null>;
}

const ArtworkCommentUnit = ({
  comment,
  postId,
  ref,
}: ArtworkCommentUnitProps) => {
  const { profileImage, nickname, createdTime, isMine } = comment;

  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div className='flex items-start gap-[29px]' ref={ref}>
      <Image
        src={profileImage || '/images/defaultProfileImage.png'}
        alt='artwork default image'
        className='rounded-full'
        width={56}
        height={56}
      />
      <div className='w-full'>
        <div className='flex justify-between items-center mb-2.5'>
          <div className='flex items-center gap-2.5'>
            <p className='button-m'>{nickname}</p>
            {isMine && (
              <p className='button-s px-2.5 py-1 bg-gray-800 rounded-[5px]'>
                MY
              </p>
            )}
          </div>
          <p>{timeFormatter(createdTime)}</p>
        </div>

        {isEditMode ? (
          <CommentEdit
            comment={comment}
            postId={postId}
            setIsEditMode={setIsEditMode}
          />
        ) : (
          <CommentDefault
            comment={comment}
            postId={postId}
            setIsEditMode={setIsEditMode}
          />
        )}
      </div>
    </div>
  );
};
export default ArtworkCommentUnit;
