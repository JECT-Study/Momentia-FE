import defaultClient from '@/apis';

import { useQuery } from '@tanstack/react-query';

export const fetchArtworkList = async () => {
  const response = await defaultClient.get('/artwork');
  return response.data;
};

export const useArtworkList = () => {
  return useQuery({
    queryKey: ['artwork-list'],
    queryFn: fetchArtworkList,
  });
};
