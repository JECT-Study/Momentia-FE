import defaultClient from '@/apis';

import { useQuery } from '@tanstack/react-query';

export const getArtworkList = async (
  sort: string,
  artworkField: string,
  search: string,
  page: number,
  size: number,
) => {
  // try {
  const response = await defaultClient.get(
    `/artwork/posts?sort=${sort}&artworkField=${artworkField}&search=${search}&page=${page}&size=${size}`,
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

export const useArtworkList = (
  sort: string,
  artworkField: string,
  search: string,
  page: number,
  size: number,
) => {
  return useQuery({
    queryKey: ['artwork-list', sort, artworkField, search, page, size],
    queryFn: () => getArtworkList(sort, artworkField, search, page, size),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    retry: 3,
  });
};
