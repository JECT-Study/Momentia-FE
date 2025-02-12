import { useQuery } from '@tanstack/react-query';

import getFollowedArtists from '@/apis/artwork/getFollowedArtists';
import { ARTWORK } from '@/constants/API';
import TokenHandler from '@/utils/tokenHandler';

const useGetFollowedArtists = () => {
  const accessToken = TokenHandler.getAccessToken();

  const { data, isLoading, error } = useQuery({
    queryKey: [ARTWORK.followedArtists],
    queryFn: getFollowedArtists,
    enabled: !!accessToken,
  });

  return {
    data: data ?? [],
    isLoading,
    error,
  };
};

export default useGetFollowedArtists;
