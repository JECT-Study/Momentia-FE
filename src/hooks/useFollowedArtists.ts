import defaultClient from '@/apis';

import { ARTWORK } from '@/constants/API';

import { useQuery } from '@tanstack/react-query';

export const getFollowedArtists = async () => {
  const response = await defaultClient.get(ARTWORK.followedArtists);
  return response.data.posts;
};

export const useFollowedArtists = () => {
  return useQuery({
    queryKey: ['followed-artists'],
    queryFn: getFollowedArtists,
  });
};
