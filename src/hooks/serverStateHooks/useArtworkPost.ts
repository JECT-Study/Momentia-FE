import { useMutation } from '@tanstack/react-query';

import postArtwork from '@/apis/artwork/postArtwork';

const useArtworkPost = () => {
  return useMutation({
    mutationFn: postArtwork,
    onError: (error) => {
      console.error('작품 업로드 중 에러 발생: ', error);
    },
    onSuccess: (data) => {
      console.log('작품 업로드 성공: ', data);
    },
  });
};

export default useArtworkPost;
