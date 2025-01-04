import { useQuery } from '@tanstack/react-query';

import { MONTHLY } from '@/constants/API';
import { COMMON_ERROR_MESSAGE } from '@/constants/errorMessage';
import { ArtworkInfoType } from '@/types';

import defaultClient from '..';

interface PopularArtworkResponseType {
  posts: ArtworkInfoType[];
}

const getMonthlyPopularArtworks = async () => {
  try {
    const { data } = await defaultClient.get<PopularArtworkResponseType>(
      MONTHLY.popularArtwork,
    );

    return data.posts;
  } catch {
    console.error(COMMON_ERROR_MESSAGE.UNKNOWN_ERROR);

    return [] as ArtworkInfoType[];
  }
};

const useGetMonthlyPopularArtworks = () => {
  const { data, isLoading } = useQuery({
    queryKey: [MONTHLY.popularArtwork],
    queryFn: getMonthlyPopularArtworks,
  });

  return {
    artworksInfo: data || ([] as ArtworkInfoType[]),
    isLoading,
  };
};

export default useGetMonthlyPopularArtworks;
