import { COLLECTION } from '@/constants/API';

import { authorizedClient } from '..';

const postCreateCollection = async (name: string, isPrivate: boolean) => {
  const response = await authorizedClient.post(COLLECTION.collection, {
    name,
    status: isPrivate ? 'PRIVATE' : 'PUBLIC',
  });

  return response.status === 201;
};

export default postCreateCollection;
