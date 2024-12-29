import defaultClient from '@/apis';

import { useQuery } from '@tanstack/react-query';

export const getArtworkList = async () => {
  const response = await defaultClient.get('/artwork/posts');
  return {
    artwork: response.data.data,
    page: response.data.page,
  };
};

export const useArtworkList = () => {
  return useQuery({
    queryKey: ['artwork-list'],
    queryFn: getArtworkList,
  });
};
