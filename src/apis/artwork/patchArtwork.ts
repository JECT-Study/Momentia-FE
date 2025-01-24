import { ARTWORK } from '@/constants/API';
import { PatchArtworkData } from '@/types';

import { authorizedClient } from '..';

const patchArtwork = async (postId: number, data: PatchArtworkData) => {
  try {
    const response = await authorizedClient.patch(
      ARTWORK.patchArtwork(postId),
      data,
    );
    console.log('요청 파라미터:', postId);
    console.log('응답 데이터: ', response.data);
    return response.data;
  } catch (error) {
    console.error('작품 수정 중 에러 발생: ', error);
    throw new Error('작품 수정에 실패하였습니다. 다시 시도해주세요.');
  }
};

export default patchArtwork;
