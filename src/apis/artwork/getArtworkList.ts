import defaultClient from '@/apis';

import { ARTWORK } from '@/constants/API';
import QUERY_KEYS from '@/constants/queryKeys';

import { ArtworkListResponse } from '@/types';

import { useQuery } from '@tanstack/react-query';

interface ArtworkListParams {
  sort: string;
  artworkField?: string;
  search: string;
  page: number;
  size: number;
}

const getArtworkList = async ({
  sort,
  artworkField,
  search,
  page,
  size,
}: ArtworkListParams) => {
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

const useArtworkList = (params: ArtworkListParams) => {
  return useQuery<ArtworkListResponse>({
    queryKey: [QUERY_KEYS.artworkList, params],
    queryFn: () => getArtworkList({ ...params }),
    retry: 3,
  });
};

export default useArtworkList;
