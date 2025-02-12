import { useQuery } from '@tanstack/react-query';

import getCollectionArtworks from '@/apis/collection/getCollectionArtworks';
import { COLLECTION } from '@/constants/API';
import { PaginationType } from '@/types';
import { CollectionArtworksParams } from '@/types/collection';

const useGetCollectionArtworks = (params: CollectionArtworksParams) => {
  const { data, isLoading } = useQuery({
    queryKey: [COLLECTION.collection, params],
    queryFn: () => getCollectionArtworks({ ...params }),
  });

  const response = data || {
    isMine: false,
    name: '',
    data: [],
    page: {} as PaginationType,
  };

  return {
    isMine: response.isMine,
    name: response.name,
    artworks: response.data,
    pageInfo: response.page,
    isLoading,
  };
};

export default useGetCollectionArtworks;
