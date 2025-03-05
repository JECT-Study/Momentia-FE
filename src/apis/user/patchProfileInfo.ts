import { isAxiosError } from 'axios';

import { USER } from '@/constants/API';
import {
  COMMON_ERROR_MESSAGE,
  EDIT_USER_PROFILE_ERROR_MESSAGE,
} from '@/constants/errorMessage';
import { ErrorResponseType } from '@/types/errorResponse';
import { UpdateProfileType } from '@/types/user';

import { authorizedClient } from '..';

const patchProfileInfo = async (updateInfo: UpdateProfileType) => {
  try {
    const response = await authorizedClient.patch<null>(
      USER.userProfile,
      updateInfo,
    );

    if (response.status !== 204) {
      throw new Error('프로필 수정에 실패하였습니다.');
    }

    return true;
  } catch (error) {
    if (isAxiosError<ErrorResponseType<null>>(error) && error.response) {
      const { code } = error;

      if (code) {
        throw new Error(EDIT_USER_PROFILE_ERROR_MESSAGE[code]);
      } else {
        throw new Error(EDIT_USER_PROFILE_ERROR_MESSAGE.UNKNOWN_ERROR);
      }
    } else {
      throw new Error(COMMON_ERROR_MESSAGE.NETWORK_ERROR);
    }
  }
};

export default patchProfileInfo;
