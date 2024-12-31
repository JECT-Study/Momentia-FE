import { MONTHLY } from '@/constants/API';
import { COMMON_ERROR_MESSAGE } from '@/constants/errorMessage';
import { useQuery } from '@tanstack/react-query';
import defaultClient from '..';

interface PopularArtworkResponseType {
  posts: ArtworkInfoType[];
}

const getMonthlyPopularArtworsk = async () => {
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
    queryFn: () => getMonthlyPopularArtworsk(),
  });

  if (!data) return { artworksInfo: [] as ArtworkInfoType[], isLoading };

  return {
    artworksInfo: data,
    isLoading,
  };
};
export default useGetMonthlyPopularArtworks;
