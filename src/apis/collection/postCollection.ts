import { COLLECTION } from '@/constants/API';

import { authorizedClient } from '..';

export interface PostCollectionProps {
  name: string;
  isPrivate: boolean;
}

const postCollection = async ({ name, isPrivate }: PostCollectionProps) => {
  const response = await authorizedClient.post(COLLECTION.collection, {
    name,
    status: isPrivate ? 'PRIVATE' : 'PUBLIC',
  });

  return response.status === 201;
};

export default postCollection;
