import { useQuery } from '@tanstack/react-query';

import getArtworkList from '@/apis/artwork/getArtworkList';
import { ARTWORK } from '@/constants/API';
import {
  ArtworkListParams,
  ArtworkListResponse,
  PaginationType,
} from '@/types';

const useGetArtworkList = (params: ArtworkListParams) => {
  const { data, isLoading, isError } = useQuery<ArtworkListResponse>({
    queryKey: [ARTWORK.artworkList, params],
    queryFn: () => getArtworkList({ ...params }),
    retry: 3,
  });

  return {
    data: data || { data: [], page: {} as PaginationType },
    isLoading,
    isError,
  };
};

export default useGetArtworkList;
