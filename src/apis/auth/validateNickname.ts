import { isAxiosError } from 'axios';

import { USER } from '@/constants/API';
import { ErrorResponseType } from '@/types/errorResponse';

import defaultClient from '..';

const getValidateNickname = async (nickname: string) => {
  try {
    const response = await defaultClient.get<null>(USER.validateNickname, {
      params: {
        nickname,
      },
    });
    return response.status;
  } catch (error) {
    if (isAxiosError<ErrorResponseType<null>>(error) && error.response)
      return error.response.status;

    return 400;
  }
};

export default getValidateNickname;
