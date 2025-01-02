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

    return response.status === 204;
  } catch (error) {
    if (isAxiosError<ErrorResponseType<null>>(error) && error.response) {
      const { code } = error;

      if (code) console.error(FOLLOW_ERROR_MESSAGE[code]);
      else console.error(COMMON_ERROR_MESSAGE.UNKNOWN_ERROR);
    } else {
      console.error(COMMON_ERROR_MESSAGE.NETWORK_ERROR);
    }

    return false;
  }
};

export default postFollow;
