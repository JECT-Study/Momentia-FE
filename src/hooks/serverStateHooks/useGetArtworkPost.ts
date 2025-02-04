'use client';

import { useQuery } from '@tanstack/react-query';

import getArtworkPost from '@/apis/artwork/getArtworkPost';
import { ARTWORK } from '@/constants/API';

const useGetArtworkPost = (postId: number | null) => {
  const { data, isLoading } = useQuery({
    queryKey: [ARTWORK.patchArtwork(postId as number)],
    queryFn: () => getArtworkPost(postId as number),
    enabled: !!postId,
    retry: 3,
  });

  if (!data) {
    return {
      headerInfo: null,
      socialInfo: null,
      detailInfo: null,
      artistInfo: null,
      existingArtwork: null,
      isLoading,
    };
  }

  const {
    title,
    artworkField,
    viewCount,
    profileImage,
    status,
    postImage,
    explanation,
    nickname,
    createdTime,
    likeCount,
    isLiked,
    userId,
    isMine,
    userField,
    isFollow,
    introduction,
    commentCount,
  } = data;

  const headerInfo = {
    title,
    artworkField,
    viewCount,
    profileImage,
    nickname,
    createdTime,
  };

  const socialInfo = {
    title,
    nickname,
    postId: data.postId,
    likeCount,
    isLiked,
  };

  const detailInfo = {
    postId: data.postId,
    userId,
    postImage,
    explanation,
    isMine,
  };

  const artistInfo = {
    userId,
    profileImage,
    nickname,
    userField,
    isFollow,
    introduction,
    isMine,
  };

  const existingArtwork = {
    title,
    artworkField,
    status,
    postImage,
    explanation,
  };

  return {
    headerInfo,
    socialInfo,
    detailInfo,
    artistInfo,
    isLoading,
    existingArtwork,
    commentCount,
  };
};

export default useGetArtworkPost;
