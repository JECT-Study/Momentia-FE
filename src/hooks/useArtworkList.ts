import defaultClient from '@/apis';

import { ARTWORK } from '@/constants/API';

import { ArtworkListResponse } from '@/types';

import { useQuery } from '@tanstack/react-query';

interface ArtworkListParams {
  sort: string;
  artworkField: string;
  search: string;
  page: number;
  size: number;
}

export const getArtworkList = async ({
  sort,
  artworkField,
  search,
  page,
  size,
}: ArtworkListParams): Promise<ArtworkListResponse> => {
  try {
    const params: Record<string, string | number> = {
      sort,
      page,
      size,
    };

    if (artworkField) params.artworkField = artworkField;
    if (search) params.search = search;

    const response = await defaultClient.get(ARTWORK.artworkList, { params });

    return {
      data: response.data.data,
      page: response.data.page,
    };
  } catch (error) {
    console.error('작품 목록 조회 중 에러 발생: ', error);
    throw new Error('작품 목록 조회 실패');
  }
};

export const useArtworkList = ({
  sort,
  artworkField,
  search,
  page,
  size,
}: ArtworkListParams) => {
  return useQuery<ArtworkListResponse>({
    queryKey: ['artwork-list', sort, artworkField, search, page, size],
    queryFn: () => getArtworkList({ sort, artworkField, search, page, size }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
  });
};
