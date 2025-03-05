import { isAxiosError } from 'axios';

import { ARTWORK } from '@/constants/API';
import {
  ARTWORK_PATCH_ERROR_MESSAGE,
  COMMON_ERROR_MESSAGE,
} from '@/constants/errorMessage';
import { PatchArtworkData } from '@/types';
import { ErrorResponseType } from '@/types/errorResponse';

import { authorizedClient } from '..';

const patchArtwork = async (postId: number, data: PatchArtworkData) => {
  try {
    const updatedData: Partial<PatchArtworkData> = Object.entries(data).reduce(
      (acc: Partial<PatchArtworkData>, [key, value]) => {
        if (value !== undefined) {
          acc[key as keyof PatchArtworkData] = value;
        }
        return acc;
      },
      {},
    );

    if (Object.keys(updatedData).length === 0) return null;

    const response = await authorizedClient.patch(
      ARTWORK.patchArtwork(postId),
      updatedData,
    );

    if (response.status === 201) {
      return response.data.postId;
    }

    throw new Error('작품 수정에 실패하였습니다.');
  } catch (error) {
    if (isAxiosError<ErrorResponseType<null>>(error) && error.response) {
      const { code } = error;

      if (code) {
        throw new Error(ARTWORK_PATCH_ERROR_MESSAGE[code]);
      } else {
        throw new Error(COMMON_ERROR_MESSAGE.UNKNOWN_ERROR);
      }
    } else {
      throw new Error(COMMON_ERROR_MESSAGE.NETWORK_ERROR);
    }
  }
};

export default patchArtwork;
