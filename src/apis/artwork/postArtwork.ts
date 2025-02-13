import { authorizedClient } from '@/apis';
import { ARTWORK } from '@/constants/API';

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
    return response.data;
  } catch (error) {
    console.error('작품 업로드 중 에러 발생: ', error);
    throw new Error('작품 업로드에 실패하였습니다. 다시 시도해주세요.');
  }
};

export default postArtwork;
