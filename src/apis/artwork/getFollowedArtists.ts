import { authorizedClient } from '@/apis';
import { ARTWORK } from '@/constants/API';
import { FollowedArtistsResponse } from '@/types';

const getFollowedArtists = async () => {
  try {
    const response = await authorizedClient.get<FollowedArtistsResponse>(
      ARTWORK.followedArtists,
    );

    return response.data.posts;
  } catch (error) {
    throw new Error('내가 팔로우한 작가 조회에 실패하였습니다.');
  }
};

export default getFollowedArtists;
