import { USER } from '@/constants/API';
import {
  COMMON_ERROR_MESSAGE,
  NICKNAME_VALIDATE_ERROR_MESSAGE,
} from '@/constants/errorMessage';
import defaultClient from '..';

import { isAxiosError } from 'axios';

const getValidateNickname = async (nickname: string) => {
  try {
    const response = await defaultClient.get<null>(USER.validateEmail, {
      params: {
        nickname,
      },
    });

    return response.status === 204;
  } catch (error) {
    if (isAxiosError<ErrorResponseType<null>>(error) && error.response) {
      const { code } = error;

      if (code) console.error(NICKNAME_VALIDATE_ERROR_MESSAGE[code]);
      else console.error(COMMON_ERROR_MESSAGE.UNKNOWN_ERROR);
    } else {
      console.error(COMMON_ERROR_MESSAGE.NETWORK_ERROR);
    }

    return false;
  }
};

export default getValidateNickname;
