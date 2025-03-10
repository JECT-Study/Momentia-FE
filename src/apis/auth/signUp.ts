import { isAxiosError } from 'axios';

import { USER } from '@/constants/API';
import {
  COMMON_ERROR_MESSAGE,
  SIGNUP_ERROR_MESSAGE,
} from '@/constants/errorMessage';
import { AuthTokenType, SignUpFormType } from '@/types/auth';
import { ErrorResponseType } from '@/types/errorResponse';

import defaultClient from '..';

const postSignUp = async (formData: SignUpFormType) => {
  try {
    const { data } = await defaultClient.post<AuthTokenType>(
      USER.signUp,
      formData,
    );

    return data;
  } catch (error) {
    if (isAxiosError<ErrorResponseType<null>>(error) && error.response) {
      const { code } = error;

      if (code) {
        throw new Error(SIGNUP_ERROR_MESSAGE[code]);
      } else {
        throw new Error(COMMON_ERROR_MESSAGE.UNKNOWN_ERROR);
      }
    } else {
      throw new Error(COMMON_ERROR_MESSAGE.NETWORK_ERROR);
    }
  }
};

export default postSignUp;
