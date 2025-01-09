import { useQuery } from '@tanstack/react-query';

import getArtworkList, {
  ArtworkListParams,
} from '@/apis/artwork/getArtworkList';
import { ARTWORK } from '@/constants/API';
import { ArtworkListResponse, PaginationType } from '@/types';

const useArtworkList = (params: ArtworkListParams) => {
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

export default useArtworkList;
