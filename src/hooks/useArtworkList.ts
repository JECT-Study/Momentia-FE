import defaultClient from '@/apis';

import { useQuery } from '@tanstack/react-query';

export const getArtworkList = async (sort: string) => {
  const response = await defaultClient.get(`/artwork/posts?sort=${sort}`);
  return {
    artwork: response.data.data,
    page: response.data.page,
  };
};

export const useArtworkList = (sort: string) => {
  return useQuery({
    queryKey: ['artwork-list', sort],
    queryFn: () => getArtworkList(sort),
  });
};
