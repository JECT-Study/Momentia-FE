import defaultClient from '@/apis';

import { ARTWORK } from '@/constants/API';
import QUERY_KEYS from '@/constants/queryKeys';

import { useQuery } from '@tanstack/react-query';

export const getFollowedArtists = async () => {
  const response = await defaultClient.get(ARTWORK.followedArtists);
  return response.data.posts;
};

export const useFollowedArtists = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.followedArtists],
    queryFn: getFollowedArtists,
  });
};
