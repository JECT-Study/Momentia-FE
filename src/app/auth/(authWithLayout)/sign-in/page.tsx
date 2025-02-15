'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'zod';

import SquareButtonL from '@/components/Button/SquareButtonL';
import EmailInput from '@/components/Input/EmailInput';
import PasswordInput from '@/components/Input/PasswordInput';
import SocialSignInSection from '@/components/SocialSignInSection';
import ROUTE from '@/constants/routes';
import usePostSignIn from '@/hooks/serverStateHooks/usePostSignIn';
import { SignInFormType } from '@/types/auth';

const signInValidationSchema = object({
  email: string().min(1, '이메일은 필수입니다.'),
  password: string().min(1, '비밀번호는 필수입니다.'),
});

const SignInPage = () => {
  const { mutate: mutateSignIn } = usePostSignIn();

  const formHandlerMethods = useForm<SignInFormType>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(signInValidationSchema),
  });

  const { isValid: isFormDataValid } = formHandlerMethods.formState;

  const onValidForm = (signInData: SignInFormType) => {
    mutateSignIn(signInData);
  };

  return (
    <div className='flex flex-col justify-center items-center max-w-[420px] w-full px-[20px] gap-[60px]'>
      <h4>로그인</h4>

      <FormProvider {...formHandlerMethods}>
        <form
          name='signin-form'
          onSubmit={formHandlerMethods.handleSubmit(onValidForm)}
          className='w-full flex flex-col gap-[60px]'
        >
          <div className='flex flex-col gap-[30px]'>
            <EmailInput mode='sign-in' />
            <PasswordInput mode='sign-in' />
          </div>
          <SquareButtonL
            type='submit'
            disabled={!isFormDataValid}
            variant={isFormDataValid ? 'primary' : 'tertiary'}
          >
            로그인
          </SquareButtonL>
        </form>
      </FormProvider>
      <div className='w-full flex flex-col gap-[30px] justify-center text-center'>
        <SocialSignInSection />
        <div className='flex gap-2.5 justify-center items-center mt-[13px]'>
          <p className='text-gray-600'>아직 회원이 아니신가요?</p>
          <Link href={ROUTE.signUp}>회원가입하기</Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
