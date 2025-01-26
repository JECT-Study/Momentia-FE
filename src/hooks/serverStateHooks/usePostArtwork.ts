import { useMutation } from '@tanstack/react-query';

import postArtwork from '@/apis/artwork/postArtwork';

const usePostArtwork = () => {
  return useMutation({
    mutationFn: postArtwork,
    onError: (error) => {
      console.error('작품 업로드 중 에러 발생: ', error);
    },
    onSuccess: (data, postId) => {
      window.location.href = `/artwork/detail/${postId}`; // 상세 페이지 경로 상수와 겹칠 듯하여 상수화 보류
    },
  });
};

export default usePostArtwork;
