import { USER } from '@/constants/API';
import defaultClient from '..';

import { isAxiosError } from 'axios';

const getValidateEmail = async (email: string) => {
  try {
    const response = await defaultClient.get<null>(USER.validateEmail, {
      params: {
        email,
      },
    });
    return response.status;
  } catch (error) {
    if (isAxiosError<ErrorResponseType<null>>(error) && error.response)
      return error.response.status;

    return 400;
  }
};

export default getValidateEmail;
