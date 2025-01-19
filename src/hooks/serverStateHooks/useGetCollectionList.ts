import { useQuery } from '@tanstack/react-query';

import getAllCollectionList from '@/apis/collection/getAllCollectionList';
import { COLLECTION } from '@/constants/API';
import { CollectionType } from '@/types/collection';

const useGetAllCollectionList = () => {
  const { data, isLoading } = useQuery({
    queryKey: [COLLECTION.collectionList],
    queryFn: () => getAllCollectionList(),
  });

  return {
    collections: data ? data.collections : ([] as CollectionType[]),
    isLoading,
  };
};

export default useGetAllCollectionList;
