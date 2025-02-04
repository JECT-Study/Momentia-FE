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
      isLoading,
    };
  }

  const headerInfo = {
    title: data.title,
    artworkField: data.artworkField,
    viewCount: data.viewCount,
    profileImage: data.profileImage,
    nickname: data.nickname,
    createdTime: data.createdTime,
  };

  const socialInfo = {
    title: data.title,
    nickname: data.nickname,
    postId: data.postId,
    likeCount: data.likeCount,
    isLiked: data.isLiked,
  };

  const detailInfo = {
    postId: data.postId,
    userId: data.userId,
    postImage: data.postImage,
    explanation: data.explanation,
    isMine: data.isMine,
  };

  const artistInfo = {
    userId: data.userId,
    profileImage: data.profileImage,
    nickname: data.nickname,
    userField: data.userField,
    isFollow: data.isFollow,
    introduction: data.introduction,
    isMine: data.isMine,
  };

  return {
    headerInfo,
    socialInfo,
    detailInfo,
    artistInfo,
    isLoading,
    commentCount: data.commentCount,
  };
};

export default useGetArtworkPost;
