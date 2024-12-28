import defaultClient from '@/apis';

import { useQuery } from '@tanstack/react-query';

export const fetchFollowedArtists = async () => {
  const response = await defaultClient.get('/artwork');
  return response.data;
};

export const useFollowedArtists = () => {
  return useQuery({
    queryKey: ['followed-artists'],
    queryFn: fetchFollowedArtists,
  });
};
