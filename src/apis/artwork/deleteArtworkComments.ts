import { isAxiosError } from 'axios';

import { ARTWORK } from '@/constants/API';
import {
  COMMENT_ERROR_MESSAGE,
  COMMON_ERROR_MESSAGE,
} from '@/constants/errorMessage';
import { ErrorResponseType } from '@/types/errorResponse';

import { authorizedClient } from '..';

const deleteArtworkComments = async (postId: number) => {
  try {
    const response = await authorizedClient.delete<null>(
      ARTWORK.artworkComment(postId),
    );

    if (response.status === 204) return true;

    throw new Error('댓글 삭제에 실패하였습니다.');
  } catch (error) {
    if (isAxiosError<ErrorResponseType<null>>(error) && error.response) {
      const { code } = error;

      if (code) {
        throw new Error(COMMENT_ERROR_MESSAGE[code]);
      } else {
        throw new Error(COMMON_ERROR_MESSAGE.UNKNOWN_ERROR);
      }
    } else {
      throw new Error(COMMON_ERROR_MESSAGE.NETWORK_ERROR);
    }
  }
};

export default deleteArtworkComments;
