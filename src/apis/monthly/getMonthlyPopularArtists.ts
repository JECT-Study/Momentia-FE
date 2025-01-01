import { MONTHLY } from '@/constants/API';
import { COMMON_ERROR_MESSAGE } from '@/constants/errorMessage';
import { useQuery } from '@tanstack/react-query';
import defaultClient from '..';

interface MonthlyPopularArtistsResponseType {
  users: ArtistInfoType[];
}

const getMonthlyPopularArtists = async () => {
  try {
    const { data } = await defaultClient.get<MonthlyPopularArtistsResponseType>(
      MONTHLY.artistOfTheMonth,
    );

    return data.users;
  } catch {
    console.error(COMMON_ERROR_MESSAGE.UNKNOWN_ERROR);

    return [] as ArtistInfoType[];
  }
};

const useGetMonthlyPopularArtists = () => {
  const { data, isLoading } = useQuery({
    queryKey: [MONTHLY.artistOfTheMonth],
    queryFn: getMonthlyPopularArtists,
  });

  return { cardsInfo: data || [], isLoading };
};

export default useGetMonthlyPopularArtists;
