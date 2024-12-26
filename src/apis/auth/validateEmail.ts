import { USER } from '@/constants/API';
import {
  COMMON_ERROR_MESSAGE,
  EMAIL_VALIDATE_ERROR_MESSAGE,
} from '@/constants/errorMessage';
import defaultClient from '..';

import { isAxiosError } from 'axios';

const getValidateEmail = async (email: string) => {
  try {
    const response = await defaultClient.get<null>(USER.validateEmail, {
      params: {
        email,
      },
    });

    return response.status === 204;
  } catch (error) {
    if (isAxiosError<ErrorResponseType<null>>(error) && error.response) {
      const { code } = error;

      if (code) console.error(EMAIL_VALIDATE_ERROR_MESSAGE[code]);
      else console.error(COMMON_ERROR_MESSAGE.UNKNOWN_ERROR);
    } else {
      console.error(COMMON_ERROR_MESSAGE.NETWORK_ERROR);
    }

    return false;
  }
};

export default getValidateEmail;
