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
    throw new Error('작품이 업로드되지 않았습니다.');
  }
};

export default postArtwork;
