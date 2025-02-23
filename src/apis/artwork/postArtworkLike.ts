import { isAxiosError } from 'axios';

import { ARTWORK } from '@/constants/API';
import {
  COMMON_ERROR_MESSAGE,
  LIKE_ERROR_MESSAGE,
} from '@/constants/errorMessage';
import { ErrorResponseType } from '@/types/errorResponse';

import { authorizedClient } from '..';

const postArtworkLike = async (postId: number) => {
  try {
    const response = await authorizedClient.post<null>(
      ARTWORK.artworkLike(postId),
    );

    if (response.status === 204) return true;

    throw new Error('좋아요가 반영되지 않았습니다.');
  } catch (error) {
    if (isAxiosError<ErrorResponseType<null>>(error) && error.response) {
      const { code } = error;

      if (code) {
        throw new Error(LIKE_ERROR_MESSAGE[code]);
      } else {
        throw new Error(COMMON_ERROR_MESSAGE.UNKNOWN_ERROR);
      }
    } else {
      throw new Error(COMMON_ERROR_MESSAGE.NETWORK_ERROR);
    }
  }
};

export default postArtworkLike;
