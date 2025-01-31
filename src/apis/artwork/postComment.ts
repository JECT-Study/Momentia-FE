import { isAxiosError } from 'axios';

import { ARTWORK } from '@/constants/API';
import {
  COMMENT_ERROR_MESSAGE,
  COMMON_ERROR_MESSAGE,
} from '@/constants/errorMessage';
import { ErrorResponseType } from '@/types/errorResponse';

import { authorizedClient } from '..';

interface PostCommentProps {
  postId: number;
  content: string;
}

const postComment = async ({ postId, content }: PostCommentProps) => {
  try {
    const response = await authorizedClient.post<{ commentId: number }>(
      ARTWORK.artworkPostComment(postId),
      {
        content,
      },
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

export default postComment;
