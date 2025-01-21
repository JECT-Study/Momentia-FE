import defaultClient from '@/apis';
import { ARTWORK } from '@/constants/API';

interface uploadArtworkData {
  title: string;
  artworkField: string;
  postImage: File;
  explanation: string;
  status: string;
}

const postArtwork = async (artworkData: uploadArtworkData) => {
  try {
    const response = await defaultClient.post(
      ARTWORK.uploadArtwork,
      artworkData,
    );
    return response.data;
  } catch (error) {
    console.error('작품 업로드 중 에러 발생: ', error);
    throw new Error('작품 업로드에 실패하였습니다. 다시 시도해주세요.');
  }
};

export default postArtwork;
