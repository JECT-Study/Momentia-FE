import { USER } from '@/constants/API';
import {
  COMMON_ERROR_MESSAGE,
  FOLLOW_ERROR_MESSAGE,
} from '@/constants/errorMessage';

import { isAxiosError } from 'axios';

import { authorizedClient } from '..';

const postFollow = async (userId: number) => {
  try {
    const response = await authorizedClient.post<null>(USER.follow, { userId });

    if (response.status === 204) {
      return true;
    } else {
      throw new Error('팔로우 요청 실패');
    }
  } catch (error) {
    if (isAxiosError<ErrorResponseType<null>>(error) && error.response) {
      const { code } = error;

      if (code) {
        console.error(FOLLOW_ERROR_MESSAGE[code]);
        throw new Error(FOLLOW_ERROR_MESSAGE[code]);
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

export default postFollow;
