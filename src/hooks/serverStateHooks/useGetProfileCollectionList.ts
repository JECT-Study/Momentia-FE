import { useQuery } from '@tanstack/react-query';

import getProfileCollectionList from '@/apis/collection/getProfileCollectionList';
import { COLLECTION } from '@/constants/API';
import { PaginationType } from '@/types';
import { UserArtworkListParams } from '@/types/user';

const useGetProfileCollectionList = (params: UserArtworkListParams) => {
  const { data, isLoading } = useQuery({
    queryKey: [COLLECTION.collectionList, params],
    queryFn: () => getProfileCollectionList({ ...params }),
  });

  const response = data || {
    isMine: false,
    data: [],
    page: {} as PaginationType,
  };

  return {
    isMine: response.isMine,
    collections: response.data,
    pageInfo: response.page,
    isLoading,
  };
};

export default useGetProfileCollectionList;
