import { useQuery } from '@tanstack/react-query';

import getArtworkList from '@/apis/artwork/getArtworkList';
import { ARTWORK } from '@/constants/API';
import {
  ArtworkListParams,
  ArtworkListResponse,
  PaginationType,
} from '@/types';

const useArtworkListGet = (params: ArtworkListParams) => {
  const { data, isLoading, error } = useQuery<ArtworkListResponse>({
    queryKey: [ARTWORK.artworkList, params],
    queryFn: () => getArtworkList({ ...params }),
    retry: 3,
  });

  return {
    data: data || { data: [], page: {} as PaginationType },
    isLoading,
    error,
  };
};

export default useArtworkListGet;
