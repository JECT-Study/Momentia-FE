'use client';

import usePostSignUp from '@/apis/auth/signUp';

import SquareButtonL from '@/components/Button/SquareButtonL';
import EmailInput from '@/components/Input/EmailInput';
import NicknameInput from '@/components/Input/NicknameInput';
import PasswordInput from '@/components/Input/PasswordInput';

import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';

const SignUpPage = () => {
  const { mutate: signUpMutate } = usePostSignUp();
  const formHandlerMethods = useForm<SignUpFormType>({
    defaultValues: {
      email: '',
      password: '',
      nickname: '',
    },
    mode: 'onChange',
  });

  const onValidForm = (formData: SignUpFormType) => {
    signUpMutate(formData);
  };

  const { isValid: isFormDataValid } = formHandlerMethods.formState;

  return (
    <div className='flex flex-col justify-center items-center gap-[60px]'>
      <h4>회원가입</h4>
      <FormProvider {...formHandlerMethods}>
        <form
          onSubmit={formHandlerMethods.handleSubmit(onValidForm)}
          className='w-full flex flex-col gap-[60px]'
        >
          <div className='flex flex-col gap-[30px]'>
            <EmailInput mode={'sign-up'} />
            <PasswordInput mode={'sign-up'} />
            <NicknameInput />
          </div>
          <SquareButtonL
            type='submit'
            backgroundColor={isFormDataValid ? 'bg-main' : 'bg-gray-800'}
            disabled={!isFormDataValid}
          >
            <p>회원가입</p>
          </SquareButtonL>
        </form>
      </FormProvider>

      <div className='flex gap-2.5 justify-center items-center mt-[13px]'>
        <p className='text-gray-600'>이미 가입된 계정이 있으신가요?</p>
        <Link href='/auth/sign-in'>로그인하러가기</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
