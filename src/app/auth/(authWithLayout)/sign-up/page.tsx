'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import { object, string, ZodIssueCode } from 'zod';

import getValidateEmail from '@/apis/auth/validateEmail';
import getValidateNickname from '@/apis/auth/validateNickname';
import SquareButtonL from '@/components/Button/SquareButtonL';
import EmailInput from '@/components/Input/EmailInput';
import NicknameInput from '@/components/Input/NicknameInput';
import PasswordInput from '@/components/Input/PasswordInput';
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

  const onValidForm = (formData: SignUpFormType) => {
    signUpMutate(formData);
  };

  const { isValid: isFormDataValid } = formHandlerMethods.formState;

  return (
    <div className='h-full flex flex-col justify-center items-center max-w-[420px] w-full px-[20px] gap-[60px]'>
      <h4>회원가입</h4>
      <FormProvider {...formHandlerMethods}>
        <form
          onSubmit={formHandlerMethods.handleSubmit(onValidForm)}
          className='w-full flex flex-col gap-[60px]'
        >
          <div className='flex flex-col gap-[15px]'>
            <EmailInput mode={'sign-up'} />
            <PasswordInput mode={'sign-up'} />
            <NicknameInput />
          </div>
          <SquareButtonL
            type='submit'
            variant={isFormDataValid ? 'primary' : 'tertiaty'}
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
