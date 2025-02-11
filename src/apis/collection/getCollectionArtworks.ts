import { isAxiosError } from 'axios';

import { COLLECTION } from '@/constants/API';
import {
  COLLECTION_ARTWORKS_ERROR_MESSAGE,
  COMMON_ERROR_MESSAGE,
} from '@/constants/errorMessage';
import {
  CollectionArtworksParams,
  ProfileCollectionListResponse,
} from '@/types/collection';
import { ErrorResponseType } from '@/types/errorResponse';
import TokenHandler from '@/utils/tokenHandler';

import defaultClient, { authorizedClient } from '..';

const getCollectionArtworks = async ({
  collectionId,
  sort,
  page,
  size,
}: CollectionArtworksParams) => {
  try {
    const currentClient =
      TokenHandler.getAccessToken() !== '' ? authorizedClient : defaultClient;

    const { data } = await currentClient.get<ProfileCollectionListResponse>(
      `${COLLECTION.collection}/${collectionId}/posts?page=${page}&size=${size}&sort=${sort}`,
    );

    return data;
  } catch (error) {
    if (isAxiosError<ErrorResponseType<null>>(error) && error.response) {
      const { code } = error;

      if (code) {
        console.error(COLLECTION_ARTWORKS_ERROR_MESSAGE[code]);
        throw new Error(COLLECTION_ARTWORKS_ERROR_MESSAGE[code]);
      } else {
        console.error(COMMON_ERROR_MESSAGE.UNKNOWN_ERROR);
        throw new Error(COMMON_ERROR_MESSAGE.UNKNOWN_ERROR);
      }
    } else {
      console.error(COMMON_ERROR_MESSAGE.NETWORK_ERROR);
      throw new Error(COMMON_ERROR_MESSAGE.NETWORK_ERROR);
    }
  }
};

export default getCollectionArtworks;
