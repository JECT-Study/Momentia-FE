import { USER } from '@/constants/API';
import defaultClient from '..';

const getValidateNickname = async (nickname: string) => 
  const response = await defaultClient.get<null>(USER.validateNickname, {
    params: {
      nickname,
    },
  });

  return response.status === 204;
};

export default getValidateNickname;
