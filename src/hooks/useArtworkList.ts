import defaultClient from '@/apis';

import { useQuery } from '@tanstack/react-query';

export const getArtworkList = async () => {
  const response = await defaultClient.get('/artwork');
  return response.data.data;
};

export const useArtworkList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['artwork-list'],
    queryFn: () => getArtworkList(),
  });

  if (!data)
    return {
      data: [],
      isLoading,
      error,
    };

  return { data, isLoading, error };
};
