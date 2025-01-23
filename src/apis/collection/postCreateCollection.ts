import { COLLECTION } from '@/constants/API';

import { authorizedClient } from '..';

export interface PostCreateColleactionProps {
  name: string;
  isPrivate: boolean;
}

const postCreateCollection = async ({
  name,
  isPrivate,
}: PostCreateColleactionProps) => {
  const response = await authorizedClient.post(COLLECTION.collection, {
    name,
    status: isPrivate ? 'PRIVATE' : 'PUBLIC',
  });

  return response.status === 201;
};

export default postCreateCollection;
