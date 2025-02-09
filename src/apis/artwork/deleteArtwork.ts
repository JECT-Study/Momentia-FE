import { isAxiosError } from 'axios';

import { ARTWORK } from '@/constants/API';
import {
  ARTWORK_POST_ERROR_MESSAGE,
  COMMON_ERROR_MESSAGE,
} from '@/constants/errorMessage';
import { ErrorResponseType } from '@/types/errorResponse';

import { authorizedClient } from '..';

const deleteArtwork = async (postId: number) => {
  try {
    const response = await authorizedClient.delete<null>(
      ARTWORK.patchArtwork(postId),
    );

    if (response.status === 204) {
      return true;
    } else {
      throw new Error('작품 삭제 실패');
    }
  } catch (error) {
    if (isAxiosError<ErrorResponseType<null>>(error) && error.response) {
      const { code } = error;

      if (code) {
        console.error(ARTWORK_POST_ERROR_MESSAGE[code]);
        throw new Error(ARTWORK_POST_ERROR_MESSAGE[code]);
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

export default deleteArtwork;
