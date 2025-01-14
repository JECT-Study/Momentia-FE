import { USER } from '@/constants/API';
import { AuthTokenType, SignUpFormType } from '@/types/auth';

import defaultClient from '..';

const postSignUp = async (formData: SignUpFormType) => {
  const { data } = await defaultClient.post<AuthTokenType>(
    USER.signUp,
    formData,
  );

  return data;
};

export default postSignUp;
