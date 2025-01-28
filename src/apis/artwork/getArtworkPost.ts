import defaultClient, { authorizedClient } from '@/apis';
import { ARTWORK } from '@/constants/API';
import { ArtworkPostType } from '@/types';
import TokenHandler from '@/utils/tokenHandler';

const getArtworkPost = async (postId: number) => {
  const currentClient =
    TokenHandler.getAccessToken() !== '' ? authorizedClient : defaultClient;

  const { data } = await currentClient.get<ArtworkPostType>(
    `${ARTWORK.artworkPost}/${postId}`,
  );

  return data;
};

export default getArtworkPost;
