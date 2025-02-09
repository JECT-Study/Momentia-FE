import { COLLECTION } from '@/constants/API';
import { ProfileCollectionListResponse } from '@/types/collection';
import { UserArtworkListParams } from '@/types/user';

import { authorizedClient } from '..';

const getProfileCollectionList = async ({
  sort,
  page,
  size,
  userId,
}: UserArtworkListParams) => {
  try {
    const { data } = await authorizedClient.get<ProfileCollectionListResponse>(
      `${COLLECTION.collectionList}?userId=${userId}&page=${page}&size=${size}&sort=${sort}`,
    );

    return data;
  } catch (error) {
    console.error('프로필 페이지 내 컬렉션 리스트 조회 중 에러 발생: ', error);
    throw new Error('프로필 페이지 내 컬렉션 리스트 조회 실패');
  }
};

export default getProfileCollectionList;
