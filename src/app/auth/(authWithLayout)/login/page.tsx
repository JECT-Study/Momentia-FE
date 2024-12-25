'use client';

import usePostLogin from '@/apis/user/login';
import SquareButtonL from '@/components/Button/SquareButtonL';
import EmailInput from '@/components/Input/EmailInput';
import PasswordInput from '@/components/Input/PasswordInput';
import SocialLoginSection from '@/components/SocialLoginSection';

import Link from 'next/link';

import { FormProvider, useForm } from 'react-hook-form';

export default function LogInPage() {
  const { mutate } = usePostLogin();

  const methods = useForm<LoginFormType>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onValid = (data: LoginFormType) => {
    console.log(data);
    mutate(data);
  };

  const allFieldsFilled = Object.values(methods.watch()).every(
    (value) => value !== '',
  );

  return (
    <div className='flex flex-col justify-center items-center gap-[60px]'>
      <h4>로그인</h4>

      <FormProvider {...methods}>
        <form
          name='login-form'
          onSubmit={methods.handleSubmit(onValid)}
          className='w-full flex flex-col gap-[60px]'
        >
          <div className='flex flex-col gap-[30px]'>
            <EmailInput mode={'sign-in'} />
            <PasswordInput mode={'sign-in'} />
          </div>
          <SquareButtonL
            type='submit'
            textSize={''}
            backgroundColor={allFieldsFilled ? 'bg-main' : 'bg-gray-800'}
          >
            <p>로그인</p>
          </SquareButtonL>
        </form>
      </FormProvider>
      <div className='w-full flex flex-col gap-[30px] justify-center text-center'>
        <SocialLoginSection />
        <div className='flex gap-2.5 justify-center items-center mt-[13px]'>
          <p className='text-gray-600'>아직 회원이 아니신가요?</p>
          <Link href='/auth/signup'>회원가입하기</Link>
        </div>
      </div>
    </div>
  );
}
