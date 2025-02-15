import { isAxiosError } from 'axios';

import { COLLECTION } from '@/constants/API';
import {
  COLLECTION_ADD_ARTWORK_ERROR_MESSAGE,
  COMMON_ERROR_MESSAGE,
} from '@/constants/errorMessage';
import { CollectionAddAndRemoveArtworkParams } from '@/types/collection';
import { ErrorResponseType } from '@/types/errorResponse';

import { authorizedClient } from '..';

const postCollectionAddArtwork = async ({
  collectionId,
  postId,
}: CollectionAddAndRemoveArtworkParams) => {
  try {
    const response = await authorizedClient.post<null>(
      COLLECTION.collectionAddAndRemoveArtwork(collectionId, postId),
    );

    if (response.status === 201) {
      return true;
    } else {
      throw new Error('컬랙션 내 작품 추가 요청 실패');
    }
  } catch (error) {
    if (isAxiosError<ErrorResponseType<null>>(error) && error.response) {
      const { code } = error;

      if (code) {
        console.error(COLLECTION_ADD_ARTWORK_ERROR_MESSAGE[code]);
        throw new Error(COLLECTION_ADD_ARTWORK_ERROR_MESSAGE[code]);
      } else {
        console.error(COMMON_ERROR_MESSAGE.UNKNOWN_ERROR);
        throw new Error(COMMON_ERROR_MESSAGE.UNKNOWN_ERROR);
      }
    } else {
      alert('이미 선택한 컬렉션에 저장한 작품입니다.');
      // console.error(COMMON_ERROR_MESSAGE.NETWORK_ERROR);
      // throw new Error(COMMON_ERROR_MESSAGE.NETWORK_ERROR);
    }
  }
};

export default postCollectionAddArtwork;
