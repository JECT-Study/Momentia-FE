import { isAxiosError } from 'axios';

import { COLLECTION } from '@/constants/API';
import {
  COMMON_ERROR_MESSAGE,
  PROFILE_COLLECTION_GET_ERROR_MESSAGE,
} from '@/constants/errorMessage';
import { ProfileCollectionListResponse } from '@/types/collection';
import { ErrorResponseType } from '@/types/errorResponse';
import { UserArtworkListParams } from '@/types/user';
import TokenHandler from '@/utils/tokenHandler';

import defaultClient, { authorizedClient } from '..';

const getProfileCollectionList = async ({
  sort,
  page,
  size,
  userId,
}: UserArtworkListParams) => {
  try {
    const currentClient =
      TokenHandler.getAccessToken() !== '' ? authorizedClient : defaultClient;

    const { data } = await currentClient.get<ProfileCollectionListResponse>(
      `${COLLECTION.collectionList}?userId=${userId}&page=${page}&size=${size}&sort=${sort}`,
    );

    return data;
  } catch (error) {
    if (isAxiosError<ErrorResponseType<null>>(error) && error.response) {
      const { code } = error;

      if (code) {
        throw new Error(PROFILE_COLLECTION_GET_ERROR_MESSAGE[code]);
      } else {
        throw new Error(COMMON_ERROR_MESSAGE.UNKNOWN_ERROR);
      }
    } else {
      throw new Error(COMMON_ERROR_MESSAGE.NETWORK_ERROR);
    }
  }
};

export default getProfileCollectionList;
