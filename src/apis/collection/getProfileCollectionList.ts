import { isAxiosError } from 'axios';

import { COLLECTION } from '@/constants/API';
import {
  COMMON_ERROR_MESSAGE,
  PROFILE_COLLECTION_GET_ERROR_MESSAGE,
} from '@/constants/errorMessage';
import { ProfileCollectionListResponse } from '@/types/collection';
import { ErrorResponseType } from '@/types/errorResponse';
import { UserArtworkListParams } from '@/types/user';

import { authorizedClient } from '..';

const getProfileCollectionList = async ({
  sort,
  page,
  size,
  userId,
}: UserArtworkListParams) => {
  try {
    const { data } = await authorizedClient.get<ProfileCollectionListResponse>(
      `${COLLECTION.collectionList}?userId=${userId}&page=${page}&size=${size}&sort=${sort}`,
    );

    return data;
  } catch (error) {
    if (isAxiosError<ErrorResponseType<null>>(error) && error.response) {
      const { code } = error;

      if (code) {
        console.error(PROFILE_COLLECTION_GET_ERROR_MESSAGE[code]);
        throw new Error(PROFILE_COLLECTION_GET_ERROR_MESSAGE[code]);
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

export default getProfileCollectionList;
