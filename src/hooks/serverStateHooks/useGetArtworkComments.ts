import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';

import getArtworkComments from '@/apis/artwork/getArtworkComments';
import { ARTWORK } from '@/constants/API';
import { ArtworkComment } from '@/types';

interface UseGetArtworkComments {
  postId: number;
  size?: number;
  skip: number;
}

const useGetArtworkComments = ({
  postId,
  size = 5,
  skip = 0,
}: UseGetArtworkComments) => {
  const {
    data: commentData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [ARTWORK.artworkPostComments, postId, { size, skip }],
    queryFn: ({ pageParam = 0 }) =>
      getArtworkComments({ postId, size, skip: pageParam }),
    initialPageParam: skip,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.comments.length === size) {
        return allPages.length * size;
      }
      return undefined;
    },
  });

  const lastCommentRef = useRef<HTMLDivElement | null>(null);

  const allCommentCount = useMemo(
    () =>
      commentData?.pages.reduce(
        (acc: number, cur: { comments: ArtworkComment[] }) =>
          cur.comments.length + acc,
        0,
      ) || 0,
    [commentData],
  );

  const [observerActive, setObserverActive] = useState(false);

  const activeObserver = () => setObserverActive(true);

  const isLoading = isFetching && !isFetchingNextPage;

  useEffect(() => {
    if (
      !observerActive ||
      !lastCommentRef.current ||
      !hasNextPage ||
      isFetching
    )
      return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: '50px', threshold: 1.0 },
    );

    observer.observe(lastCommentRef.current);

    return () => observer.disconnect();
  }, [observerActive, fetchNextPage, hasNextPage, isFetching]);

  return {
    commentData,
    allCommentCount,
    isLoading,
    hasNextPage,
    lastCommentRef,
    observerActive,
    activeObserver,
  };
};

export default useGetArtworkComments;
