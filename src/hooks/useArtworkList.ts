import defaultClient from '@/apis';

import { useQuery } from '@tanstack/react-query';

export const getArtworkList = async () => {
  const response = await defaultClient.get('/artwork');
  return response.data;
};

export const useArtworkList = () => {
  return useQuery({
    queryKey: ['artwork-list'],
    queryFn: getArtworkList,
  });
};
