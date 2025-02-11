import { isAxiosError } from 'axios';

import { COLLECTION } from '@/constants/API';
import {
  COLLECTION_PATCH_ERROR_MESSAGE,
  COMMON_ERROR_MESSAGE,
} from '@/constants/errorMessage';
import { PatchCollectionParams } from '@/types/collection';
import { ErrorResponseType } from '@/types/errorResponse';

import { authorizedClient } from '..';

const patchCollection = async ({
  collectionId,
  data,
}: PatchCollectionParams) => {
  try {
    const response = await authorizedClient.patch(
      COLLECTION.modifyCollection(collectionId),
      data,
    );

    if (response.status === 204) {
      return true;
    } else {
      throw new Error('컬렉션 수정 실패');
    }
  } catch (error) {
    if (isAxiosError<ErrorResponseType<null>>(error) && error.response) {
      const { code } = error;

      if (code) {
        console.error(COLLECTION_PATCH_ERROR_MESSAGE[code]);
        throw new Error(COLLECTION_PATCH_ERROR_MESSAGE[code]);
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

export default patchCollection;
