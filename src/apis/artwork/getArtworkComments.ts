import { ARTWORK } from '@/constants/API';
import { ArtworkComment } from '@/types';
import TokenHandler from '@/utils/tokenHandler';

import defaultClient, { authorizedClient } from '..';

const getArtworkComments = async ({
  postId,
  size = 20,
  skip = 0,
}: {
  postId: number;
  size: number;
  skip: number;
}) => {
  const currentClient =
    TokenHandler.getAccessToken() !== '' ? authorizedClient : defaultClient;

  const { data } = await currentClient.get<{ comments: ArtworkComment[] }>(
    `${ARTWORK.artworkPostComments(postId)}?size=${size}&skip=${skip}`,
  );

  return data;
};

export default getArtworkComments;
