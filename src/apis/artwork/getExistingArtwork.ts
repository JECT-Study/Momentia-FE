import { authorizedClient } from '@/apis';
import { ARTWORK } from '@/constants/API';

const getExistingArtwork = async (postId: number | null) => {
  if (!postId) {
    throw new Error('postId가 유효하지 않습니다.');
  }

  try {
    const { data } = await authorizedClient.get(ARTWORK.patchArtwork(postId));

    return {
      title: data.title,
      artworkField: data.artworkField,
      status: data.status,
      postImage: data.postImage,
      explanation: data.explanation,
    };
  } catch (error) {
    console.error('작품 데이터를 불러오는 중 오류 발생: ', error);
    throw new Error('작품 데이터를 가져오는 데 실패했습니다.');
  }
};

export default getExistingArtwork;
