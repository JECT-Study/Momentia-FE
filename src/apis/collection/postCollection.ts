import { isAxiosError } from 'axios';

import { COLLECTION } from '@/constants/API';
import {
  COLLECTION_POST_ERROR_MESSAGE,
  COMMON_ERROR_MESSAGE,
} from '@/constants/errorMessage';
import { ErrorResponseType } from '@/types/errorResponse';

import { authorizedClient } from '..';

export interface PostCollectionProps {
  name: string;
  isPrivate: boolean;
}

const postCollection = async ({ name, isPrivate }: PostCollectionProps) => {
  try {
    const response = await authorizedClient.post(COLLECTION.collection, {
      name,
      status: isPrivate ? 'PRIVATE' : 'PUBLIC',
    });

    return response.status === 201;
  } catch (error) {
    if (isAxiosError<ErrorResponseType<null>>(error) && error.response) {
      const { code } = error;

      if (code) {
        console.error(COLLECTION_POST_ERROR_MESSAGE[code]);
        throw new Error(COLLECTION_POST_ERROR_MESSAGE[code]);
      } else {
        console.error(COMMON_ERROR_MESSAGE.UNKNOWN_ERROR);
        throw new Error(COMMON_ERROR_MESSAGE.UNKNOWN_ERROR);
      }
    } else {
      alert('이미 존재하는 컬렉션 이름입니다.');
      // console.error(COMMON_ERROR_MESSAGE.NETWORK_ERROR);
      // throw new Error(COMMON_ERROR_MESSAGE.NETWORK_ERROR);
    }
  }
};

export default postCollection;
