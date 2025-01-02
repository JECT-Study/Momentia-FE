import defaultClient from '@/apis';

import { useQuery } from '@tanstack/react-query';

export const getFollowedArtists = async () => {
  const response = await defaultClient.get('/artwork/followingUsers/posts');
  return response.data.posts;
};

export const useFollowedArtists = () => {
  return useQuery({
    queryKey: ['followed-artists'],
    queryFn: getFollowedArtists,
  });
};
