import { useQuery } from '@tanstack/react-query';

import getFollowedArtists from '@/apis/artwork/getFollowedArtists';
import { ARTWORK } from '@/constants/API';
import TokenHandler from '@/utils/tokenHandler';

const useFollowedArtists = () => {
  const accessToken = TokenHandler.getAccessToken();

  return useQuery({
    queryKey: [ARTWORK.followedArtists],
    queryFn: getFollowedArtists,
    enabled: !!accessToken,
  });
};

export default useFollowedArtists;
