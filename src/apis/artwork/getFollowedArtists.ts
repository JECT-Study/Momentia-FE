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
    console.error('내가 팔로우한 작가 조회 중 에러 발생: ', error);
    throw new Error('내가 팔로우한 작가 조회 실패');
  }
};

export default getFollowedArtists;
