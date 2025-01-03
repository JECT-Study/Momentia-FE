import { authorizedClient } from '@/apis';

import { ARTWORK } from '@/constants/API';

import { useQuery } from '@tanstack/react-query';

const getFollowedArtists = async () => {
  try {
    const response = await authorizedClient.get(ARTWORK.followedArtists);
    return response.data.posts;
  } catch (error) {
    console.error('내가 팔로우한 작가 조회 중 에러 발생: ', error);
    throw new Error('내가 팔로우한 작가 조회 실패');
  }
};

const useFollowedArtists = () => {
  return useQuery({
    queryKey: [ARTWORK.followedArtists],
    queryFn: getFollowedArtists,
  });
};

export default useFollowedArtists;
