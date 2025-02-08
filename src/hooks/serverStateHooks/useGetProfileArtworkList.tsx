import { useQuery } from '@tanstack/react-query';

import getProfileArtworkList from '@/apis/user/getProfileArtworkList';
import { USER } from '@/constants/API';
import { PaginationType } from '@/types';
import { UserArtworkListParams } from '@/types/user';

const useGetUserArtworkList = (params: UserArtworkListParams) => {
  const { data, isLoading } = useQuery({
    queryKey: [USER.artworkList, params],
    queryFn: () => getProfileArtworkList({ ...params }),
  });

  const result = data || {
    isMine: false,
    data: [],
    page: {} as PaginationType,
  };

  return {
    isMine: result.isMine,
    artworkList: result.data,
    pageInfo: result.page,
    isLoading,
  };
};

export default useGetUserArtworkList;
