'use client';

import usePostSignUp from '@/apis/user/signUp';
import SquareButtonL from '@/components/Button/SquareButtonL';
import EmailInput from '@/components/Input/EmailInput';
import NicknameInput from '@/components/Input/NicknameInput';
import PasswordInput from '@/components/Input/PasswordInput';

import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';

export default function SignUpPage() {
  const { mutate } = usePostSignUp();
  const methods = useForm<SignUpFormType>({
    defaultValues: {
      email: '',
      password: '',
      nickname: '',
    },
    mode: 'onChange',
  });

  const onValidForm = (data: SignUpFormType) => {
    mutate(data);
  };

  const { isValid } = methods.formState;

  return (
    <div className='flex flex-col justify-center items-center gap-[60px]'>
      <h4>회원가입</h4>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onValidForm)}
          className='w-full flex flex-col gap-[60px]'
        >
          <div className='flex flex-col gap-[30px]'>
            <EmailInput mode={'sign-up'} />
            <PasswordInput mode={'sign-up'} />
            <NicknameInput />
          </div>
          <SquareButtonL
            type='submit'
            textSize={''}
            backgroundColor={isValid ? 'bg-main' : 'bg-gray-800'}
            disabled={!isValid}
          >
            <p>회원가입</p>
          </SquareButtonL>
        </form>
      </FormProvider>

      <div className='flex gap-2.5 justify-center items-center mt-[13px]'>
        <p className='text-gray-600'>이미 가입된 계정이 있으신가요?</p>
        <Link href='/auth/login'>로그인하러가기</Link>
      </div>
    </div>
  );
}
