'use client';

import usePostSignIn from '@/apis/auth/signIn';
import SquareButtonL from '@/components/Button/SquareButtonL';
import EmailInput from '@/components/Input/EmailInput';
import PasswordInput from '@/components/Input/PasswordInput';
import SocialSignInSection from '@/components/SocialSignInSection';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'zod';

const signInValidationSchema = object({
  email: string({
    required_error: '이메일은 필수입니다.',
  }),
  password: string({
    required_error: '비밀번호는 필수입니다.',
  }),
});

export default function SignInPage() {
  const { mutate: mutateSignIn } = usePostSignIn();

  const methods = useForm<SignInFormType>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(signInValidationSchema),
  });

  const onValid = (signInData: SignInFormType) => {
    mutateSignIn(signInData);
  };

  const allFieldsFilled = Object.values(methods.watch()).every(
    (value) => value !== '',
  );

  return (
    <div className='flex flex-col justify-center items-center gap-[60px]'>
      <h4>로그인</h4>

      <FormProvider {...methods}>
        <form
          name='signin-form'
          onSubmit={methods.handleSubmit(onValid)}
          className='w-full flex flex-col gap-[60px]'
        >
          <div className='flex flex-col gap-[30px]'>
            <EmailInput mode={'sign-in'} />
            <PasswordInput mode={'sign-in'} />
          </div>
          <SquareButtonL
            type='submit'
            backgroundColor={allFieldsFilled ? 'bg-main' : 'bg-gray-800'}
          >
            <p>로그인</p>
          </SquareButtonL>
        </form>
      </FormProvider>
      <div className='w-full flex flex-col gap-[30px] justify-center text-center'>
        <SocialSignInSection />
        <div className='flex gap-2.5 justify-center items-center mt-[13px]'>
          <p className='text-gray-600'>아직 회원이 아니신가요?</p>
          <Link href='/auth/sign-up'>회원가입하기</Link>
        </div>
      </div>
    </div>
  );
}
