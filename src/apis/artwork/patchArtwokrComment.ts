import { isAxiosError } from 'axios';

import { ARTWORK } from '@/constants/API';
import {
  COMMENT_ERROR_MESSAGE,
  COMMON_ERROR_MESSAGE,
} from '@/constants/errorMessage';
import { ErrorResponseType } from '@/types/errorResponse';

import { authorizedClient } from '..';

const patchArtworkComment = async (commentId: number, content: string) => {
  try {
    const response = await authorizedClient.patch<null>(
      ARTWORK.artworkComment(commentId),
      { content },
    );

    if (response.status === 204) {
      return content;
    } else {
      throw new Error('댓글 수정 실패');
    }
  } catch (error) {
    if (isAxiosError<ErrorResponseType<null>>(error) && error.response) {
      const { code } = error;

      if (code) {
        console.error(COMMENT_ERROR_MESSAGE[code]);
        throw new Error(COMMENT_ERROR_MESSAGE[code]);
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

export default patchArtworkComment;
