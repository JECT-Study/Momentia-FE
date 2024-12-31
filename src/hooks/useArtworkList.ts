import defaultClient from '@/apis';

import { useQuery } from '@tanstack/react-query';

export const getArtworkList = async (sort: string, search: string) => {
  // try {
  const response = await defaultClient.get<ArtworkResponse>(
    `/artwork/posts?sort=${sort}&search=${search}`,
  );

  return {
    artwork: response.data.data,
    page: response.data.page,
  };
  // } catch (error) {
  //   console.error('작품 목록 조회 중 에러 발생: ', error);
  //   throw new Error('작품 목록 조회 실패');
  // }
};

export const useArtworkList = (sort: string, search: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['artwork-list', sort, search],
    queryFn: () => getArtworkList(sort, search),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    retry: 3,
  });

  if (!data)
    return {
      data: { artwork: [] as ArtworkInfoType[], page: null },
      isLoading,
      error,
    };

  return { data, isLoading, error };
};
