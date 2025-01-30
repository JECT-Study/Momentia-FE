'use client';

import { Fragment } from 'react';

import Icon from '@/components/Icon/Icon';
import useGetArtworkComments from '@/hooks/serverStateHooks/useGetArtworkComments';

import ArtworkCommentUnit from './ArtworkCommentUnit';
import ArtworkWriteCommentSection from './ArtworkWriteCommentSection';

const ArtworkCommentSection = ({ postId }: { postId: number }) => {
  const {
    commentData,
    allCommentCount,
    isLoading,
    hasNextPage,
    lastCommentRef,
    observerActive,
    activeObserver,
  } = useGetArtworkComments({
    postId,
    skip: 0,
  });

  const isCommentEmpty =
    commentData === undefined ||
    commentData?.pages.flatMap((page) => page.comments).length === 0;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='flex-1 flex flex-col gap-5'>
      <h2>댓글 ({allCommentCount})</h2>
      <div className='flex flex-col gap-[30px] tablet:px-[60px] px-[10px] py-[60px] rounded-[10px] bg-gray-900'>
        <ArtworkWriteCommentSection postId={postId} />
        <div className='flex flex-col gap-[70px]'>
          {isCommentEmpty ? (
            <p>작성된 댓글이 없습니다.</p>
          ) : (
            commentData.pages.map((page, pageIndex) => (
              <Fragment key={pageIndex}>
                {page.comments.map((comment, index) => {
                  const isLastComment = index === page.comments.length - 1;
                  return (
                    <ArtworkCommentUnit
                      ref={isLastComment ? lastCommentRef : null}
                      key={comment.commentId}
                      comment={comment}
                      postId={postId}
                    />
                  );
                })}
              </Fragment>
            ))
          )}
        </div>
        {!observerActive && hasNextPage && (
          <button
            type='button'
            className='flex items-center gap-2.5 w-fit ml-auto button-m text-gray-500'
            onClick={activeObserver}
          >
            <p>댓글 모두 보기</p>
            <Icon name='ChevronRight' />
          </button>
        )}
      </div>
    </div>
  );
};

export default ArtworkCommentSection;
