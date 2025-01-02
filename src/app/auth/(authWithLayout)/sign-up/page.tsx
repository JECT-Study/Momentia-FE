'use client';

import usePostSignUp from '@/apis/auth/signUp';
import getValidateEmail from '@/apis/auth/validateEmail';
import getValidateNickname from '@/apis/auth/validateNickname';

import SquareButtonL from '@/components/Button/SquareButtonL';
import EmailInput from '@/components/Input/EmailInput';
import NicknameInput from '@/components/Input/NicknameInput';
import PasswordInput from '@/components/Input/PasswordInput';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'zod';

const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{9,}$/;
const NICKNAME_REGEX = /^[\u3131-\u318E가-힣A-Za-z0-9]+$/;
const MAX_NICKNAME_LENGTH = 10;

const signUpValidationSchema = object({
  email: string()
    .min(1, '이메일은 필수입니다.')
    .email('유효하지 않은 이메일 형식입니다.')
    .refine(async (email) => {
      const isDuplicated = await getValidateEmail(email);
      return isDuplicated;
    }, '이미 가입된 이메일입니다.'),
  password: string()
    .min(1, '비밀번호는 필수입니다.')
    .regex(
      PASSWORD_REGEX,
      '영문, 숫자, 특수문자를 포함해 9자 이상 입력해주세요.',
    ),
  nickname: string()
    .min(1, '닉네임은 필수입니다.')
    .max(MAX_NICKNAME_LENGTH, '최대 닉네임 길이를 초과했습니다.')
    .regex(NICKNAME_REGEX, '한글, 영어, 숫자로 구성된 닉네임을 입력해주세요.')
    .refine(async (nickname) => {
      const isDuplicated = await getValidateNickname(nickname);
      return isDuplicated;
    }, '이미 사용중인 닉네임입니다.'),
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
            disabled={!isFormDataValid}
            variant={'primary'}
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
