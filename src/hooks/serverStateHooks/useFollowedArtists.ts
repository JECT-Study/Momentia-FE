import { useQuery } from '@tanstack/react-query';

import getFollowedArtists from '@/apis/artwork/getFollowedArtists';
import { ARTWORK } from '@/constants/API';

const useFollowedArtists = () => {
  return useQuery({
    queryKey: [ARTWORK.followedArtists],
    queryFn: getFollowedArtists,
  });
};

export default useFollowedArtists;
