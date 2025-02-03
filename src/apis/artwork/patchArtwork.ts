import { ARTWORK } from '@/constants/API';
import { PatchArtworkData } from '@/types';

import { authorizedClient } from '..';

const patchArtwork = async (postId: number, data: PatchArtworkData) => {
  try {
    const updatedData: Partial<PatchArtworkData> = Object.entries(data).reduce(
      (acc: Partial<PatchArtworkData>, [key, value]) => {
        if (value !== undefined && value !== '') {
          acc[key as keyof PatchArtworkData] = value;
        }
        return acc;
      },
      {},
    );

    if (Object.keys(updatedData).length === 0) {
      return null;
    }

    const response = await authorizedClient.patch(
      ARTWORK.patchArtwork(postId),
      updatedData,
    );

    return response.data.postId;
  } catch (error) {
    console.error('작품 수정 중 에러 발생: ', error);
    throw new Error('작품 수정에 실패하였습니다. 다시 시도해주세요.');
  }
};

export default patchArtwork;
