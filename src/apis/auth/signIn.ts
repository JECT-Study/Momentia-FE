import { USER } from '@/constants/API';
import { AuthTokenType, SignInFormType } from '@/types/auth';

import defaultClient from '..';

const postSignIn = async (formData: SignInFormType) => {
  const { data } = await defaultClient.post<AuthTokenType>(
    USER.signIn,
    formData,
  );

  return data;
};

export default postSignIn;
