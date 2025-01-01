import defaultClient from '@/apis';

import { ARTWORK } from '@/constants/API';
import QUERY_KEYS from '@/constants/queryKeys';

import { useQuery } from '@tanstack/react-query';

export const getFollowedArtists = async () => {
  try {
    const response = await defaultClient.get(ARTWORK.followedArtists);
    return response.data.posts;
  } catch (error) {
    console.error('내가 팔로우한 작가 조회 중 에러 발생: ', error);
    throw new Error('내가 팔로우한 작가 조회 실패');
  }
};

export const useFollowedArtists = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.followedArtists],
    queryFn: getFollowedArtists,
  });
};
