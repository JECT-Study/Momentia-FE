'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { debounce } from 'lodash';
import Link from 'next/link';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'zod';

import usePostSignIn from '@/apis/auth/signIn';
import SquareButtonL from '@/components/Button/SquareButtonL';
import BasicInput from '@/components/Input/BasicInput';
import SocialSignInSection from '@/components/SocialSignInSection';
import ROUTE from '@/constants/routes';
import { SignInFormType } from '@/types/auth';

const signInValidationSchema = object({
  email: string().min(1, '이메일은 필수입니다.'),
  password: string().min(1, '비밀번호는 필수입니다.'),
});

const SignInPage = () => {
  const [isEmailValidating, setIsEmailValidating] = useState(false);
  const [isPasswordValidating, setIsPasswordValidating] = useState(false);

  const { mutate: mutateSignIn } = usePostSignIn();

  const formHandlerMethods = useForm<SignInFormType>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(signInValidationSchema),
  });

  const {
    register,
    resetField,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid: isFormDataValid },
  } = formHandlerMethods;

  const email = watch('email');
  const password = watch('password');

  const handleEmailInputOnChange = debounce(async (e) => {
    setValue('email', e.target.value);
    setIsEmailValidating(true);
    await trigger('email');
    setIsEmailValidating(false);
  }, 300);

  const clearEmailField = () => resetField('email');

  const handlePasswordInputOnChange = debounce(async (e) => {
    setValue('password', e.target.value);
    setIsPasswordValidating(true);
    await trigger('password');
    setIsPasswordValidating(false);
  }, 300);

  const onValidForm = (signInData: SignInFormType) => {
    mutateSignIn(signInData);
  };

  return (
    <div className='flex flex-col justify-center items-center gap-[60px]'>
      <h4>로그인</h4>

      <FormProvider {...formHandlerMethods}>
        <form
          name='signin-form'
          onSubmit={formHandlerMethods.handleSubmit(onValidForm)}
          className='w-full flex flex-col gap-[60px]'
        >
          <div className='flex flex-col gap-[30px]'>
            {/* TODO: 검증할 요소 더 있으면 BasicInput의 errorMessage,
            successMessage에 추가 */}
            <BasicInput
              {...register('email')}
              type='email'
              label='이메일'
              placeholder='이메일을 입력해주세요.'
              value={email}
              onChange={handleEmailInputOnChange}
              showClear={true}
              onClear={clearEmailField}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message as string}
              successMessage={
                email && !isEmailValidating && !errors.email
                  ? '사용 가능한 이메일입니다.'
                  : undefined
              }
            />
            <BasicInput
              {...register('password')}
              type='password'
              label='비밀번호'
              placeholder='비밀번호를 입력해주세요.'
              value={password}
              onChange={handlePasswordInputOnChange}
              showEyeIcon={true}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message as string}
              successMessage={
                password && !isPasswordValidating && !errors.password
                  ? '비밀번호 검증 중...'
                  : undefined
              }
            />
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
