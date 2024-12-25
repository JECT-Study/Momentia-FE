import { USER } from '@/constants/API';
import { useQuery } from '@tanstack/react-query';
import defaultClient from '..';

const getValidateEmail = async (email: string): Promise<ValidateResponse> => {
  const { data } = await defaultClient.get<ResponseRootType<null>>(
    USER.validateEmail,
    {
      params: {
        email,
      },
    },
  );

  const { code, message } = data;

  return {
    isValid: code === 204,
    message,
  };
};

const useGetValidateEmail = (email: string, mode: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [USER.validateEmail, email],
    queryFn: () => getValidateEmail(email),
    enabled: email.trim() !== '' && mode === 'sign-up',
  });

  const hasData = !!data;

  const validInfo = hasData
    ? { isValid: data.isValid, message: data.message }
    : { isValid: false, message: '' };

  return { isLoading, ...validInfo };
};

export default useGetValidateEmail;
