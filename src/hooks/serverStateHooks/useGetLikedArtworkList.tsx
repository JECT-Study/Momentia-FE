import { useQuery } from '@tanstack/react-query';

import getLikedArtworkList from '@/apis/user/getLikedArtworkList';
import { USER } from '@/constants/API';
import { ArtworkListParams, PaginationType } from '@/types';

interface UseGetLikedArtworkListProps
  extends Pick<ArtworkListParams, 'sort' | 'page' | 'size'> {}

const useGetLikedArtworkList = (params: UseGetLikedArtworkListProps) => {
  const { data, isLoading } = useQuery({
    queryKey: [USER.likedArtworkList, params],
    queryFn: () => getLikedArtworkList({ ...params }),
  });

  const result = data || {
    data: [],
    page: {} as PaginationType,
  };

  return {
    artworkList: result.data,
    pageInfo: result.page,
    isLoading,
  };
};

export default useGetLikedArtworkList;
