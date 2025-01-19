import { COLLECTION } from '@/constants/API';
import { CollectionType } from '@/types/collection';

import { authorizedClient } from '..';

const getAllCollectionList = async () => {
  try {
    const { data } = await authorizedClient.get<{
      collections: CollectionType[];
    }>(COLLECTION.allCollectionsList);

    return data;
  } catch (error) {}
};

export default getAllCollectionList;
