'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { debounce } from 'lodash';
import Link from 'next/link';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { object, string, ZodIssueCode } from 'zod';

import getValidateEmail from '@/apis/auth/validateEmail';
import getValidateNickname from '@/apis/auth/validateNickname';
import SquareButtonL from '@/components/Button/SquareButtonL';
import BasicInput from '@/components/Input/BasicInput';
import {
  NICKNAME_VALIDATE_ERROR_MESSAGE,
  SIGNIN_ERROR_MESSAGE,
} from '@/constants/errorMessage';
import ROUTE from '@/constants/routes';
import usePostSignUp from '@/hooks/serverStateHooks/usePostSignUp';
import { SignUpFormType } from '@/types/auth';

const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{9,}$/;
const NICKNAME_REGEX = /^[\u3131-\u318E가-힣A-Za-z0-9]+$/;
const MAX_NICKNAME_LENGTH = 10;

const signUpValidationSchema = object({
  email: string()
    .min(1, SIGNIN_ERROR_MESSAGE.EMAIL_REQUIRED)
    .email(SIGNIN_ERROR_MESSAGE.INVALID_EMAIL)
    .superRefine(async (email, ctx) => {
      const status = await getValidateEmail(email);

      if (status === 400) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: SIGNIN_ERROR_MESSAGE.INVALID_EMAIL,
        });
      }

      if (status === 409) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: SIGNIN_ERROR_MESSAGE.DUPLICATE_EMAIL,
        });
      }
    }),
  password: string()
    .min(1, SIGNIN_ERROR_MESSAGE.PASSWORD_REQUIRED)
    .regex(PASSWORD_REGEX, SIGNIN_ERROR_MESSAGE.INVALID_PASSWORD),
  nickname: string()
    .min(1, SIGNIN_ERROR_MESSAGE.NICKNAME_REQUIRED)
    .max(MAX_NICKNAME_LENGTH, SIGNIN_ERROR_MESSAGE.EXCEED_NICKNAME_LENGTH)
    .regex(NICKNAME_REGEX, SIGNIN_ERROR_MESSAGE.INVALID_NICKNAME)
    .superRefine(async (nickname, ctx) => {
      const status = await getValidateNickname(nickname);

      if (status === 400) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: NICKNAME_VALIDATE_ERROR_MESSAGE.INVALID_NICKNAME,
        });
      }

      if (status === 409) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: NICKNAME_VALIDATE_ERROR_MESSAGE.DUPLICATE_NICKNAME,
        });
      }
    }),
});

const SignUpPage = () => {
  const [isEmailValidating, setIsEmailValidating] = useState(false);
  const [isPasswordValidating, setIsPasswordValidating] = useState(false);
  const [isNicknameValidating, setIsNicknameValidating] = useState(false);

  const { mutate: signUpMutate } = usePostSignUp();

  const formHandlerMethods = useForm<SignUpFormType>({
    defaultValues: {
      email: '',
      password: '',
      nickname: '',
    },
    mode: 'onChange',
    resolver: zodResolver(signUpValidationSchema),
  });

  const {
    register,
    setValue,
    resetField,
    trigger,
    watch,
    formState: { errors, isValid: isFormDataValid },
  } = formHandlerMethods;

  const email = watch('email');
  const password = watch('password');
  const nickname = watch('nickname');

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

  const handleNicknameInputOnChange = debounce(async (e) => {
    setValue('nickname', e.target.value);
    setIsNicknameValidating(true);
    await trigger('nickname');
    setIsNicknameValidating(false);
  }, 300);

  const onValidForm = (formData: SignUpFormType) => {
    signUpMutate(formData);
  };

  return (
    <div className='h-full flex flex-col justify-center items-center max-w-[420px] w-full px-[20px] gap-[60px]'>
      <h4>회원가입</h4>
      <FormProvider {...formHandlerMethods}>
        <form
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
                  ? '사용 가능한 비밀번호입니다.'
                  : undefined
              }
            />
            <BasicInput
              {...register('nickname')}
              type='text'
              label='닉네임'
              placeholder='닉네임을 입력해주세요.'
              value={nickname}
              onChange={handleNicknameInputOnChange}
              showTextLength={true}
              maxLength={MAX_NICKNAME_LENGTH}
              isInvalid={!!errors.nickname}
              errorMessage={errors.nickname?.message as string}
              successMessage={
                nickname && !isNicknameValidating && !errors.nickname
                  ? '사용 가능한 닉네임입니다.'
                  : undefined
              }
            />
          </div>
          <SquareButtonL
            type='submit'
            disabled={!isFormDataValid}
            variant={isFormDataValid ? 'primary' : 'tertiary'}
          >
            <p>회원가입</p>
          </SquareButtonL>
        </form>
      </FormProvider>

      <div className='flex gap-2.5 justify-center items-center mt-[13px]'>
        <p className='text-gray-600'>이미 가입된 계정이 있으신가요?</p>
        <Link href={ROUTE.signIn}>로그인하러가기</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
