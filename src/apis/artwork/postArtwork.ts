import { isAxiosError } from 'axios';

import { authorizedClient } from '@/apis';
import { ARTWORK } from '@/constants/API';
import {
  ARTWORK_POST_ERROR_MESSAGE,
  COMMON_ERROR_MESSAGE,
} from '@/constants/errorMessage';
import { ErrorResponseType } from '@/types/errorResponse';

interface ArtworkUploadData {
  title: string;
  artworkField: string;
  postImage: number | null;
  explanation: string;
  status: string;
}

const postArtwork = async (artworkData: ArtworkUploadData) => {
  try {
    const response = await authorizedClient.post(
      ARTWORK.uploadArtwork,
      artworkData,
    );

    if (response.status === 201) return response.data;

    throw new Error('작품이 업로드되지 않았습니다.');
  } catch (error) {
    if (isAxiosError<ErrorResponseType<null>>(error) && error.response) {
      const { code } = error;

      if (code) {
        throw new Error(ARTWORK_POST_ERROR_MESSAGE[code]);
      } else {
        throw new Error(COMMON_ERROR_MESSAGE.UNKNOWN_ERROR);
      }
    } else {
      throw new Error(COMMON_ERROR_MESSAGE.NETWORK_ERROR);
    }
  }
};

export default postArtwork;
