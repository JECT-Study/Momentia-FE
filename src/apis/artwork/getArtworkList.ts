import defaultClient, { authorizedClient } from '@/apis';
import { ARTWORK } from '@/constants/API';
import { ArtworkListParams } from '@/types';
import TokenHandler from '@/utils/tokenHandler';

const getArtworkList = async ({
  sort,
  artworkField,
  search,
  page,
  size,
}: ArtworkListParams) => {
  try {
    const params: Record<string, string | number> = {
      sort,
      page,
      size,
    };

    if (artworkField) params.artworkField = artworkField;
    if (search) params.search = search;

    const currentClient =
      TokenHandler.getAccessToken() !== '' ? authorizedClient : defaultClient;

    const response = await currentClient.get(ARTWORK.artworkList, {
      params,
    });

    return {
      data: response.data.data,
      page: response.data.page,
    };
  } catch (error) {
    console.error('작품 목록 조회 중 에러 발생: ', error);
    throw new Error('작품 목록 조회에 실패하였습니다. 다시 시도해주세요.');
  }
};

export default getArtworkList;
