'use client';

import { debounce } from 'lodash';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import BasicInput from './BasicInput';

interface PasswordInputProps {
  mode: 'sign-up' | 'sign-in';
}

const PasswordInput = ({ mode }: PasswordInputProps) => {
  const [isPasswordValidating, setIsPasswordValidating] = useState(false);

  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();

  const handlePasswordInputOnChange = debounce(async (e) => {
    register('password').onChange(e);
    setIsPasswordValidating(true);
    await trigger('password');
    setIsPasswordValidating(false);
  }, 300);

  return (
    <BasicInput
      {...register('password')}
      type='password'
      label='비밀번호'
      placeholder='비밀번호를 입력해주세요.'
      isValidating={mode === 'sign-up' && isPasswordValidating}
      validationMessage={mode === 'sign-up' ? '비밀번호 검증 중...' : undefined}
      isInvalid={!!errors.password}
      errorMessage={errors.password?.message as string}
      onChange={handlePasswordInputOnChange}
      successMessage={
        mode === 'sign-up' ? '사용 가능한 비밀번호입니다.' : undefined
      }
      showEyeIcon={true}
    />
  );
};

export default PasswordInput;
