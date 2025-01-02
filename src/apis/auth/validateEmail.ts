import { USER } from '@/constants/API';
import defaultClient from '..';

const getValidateEmail = async (email: string) => {
  const response = await defaultClient.get<null>(USER.validateEmail, {
    params: {
      email,
    },
  });

  return response.status === 204;
};

export default getValidateEmail;
