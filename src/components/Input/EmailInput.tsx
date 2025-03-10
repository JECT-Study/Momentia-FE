'use client';

import { debounce } from 'lodash';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import BasicInput from './BasicInput';

interface EmailInputProps {
  mode: 'sign-up' | 'sign-in';
}

const EmailInput = ({ mode }: EmailInputProps) => {
  const [isEmailValidating, setIsEmailValidating] = useState(false);

  const {
    register,
    resetField,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  const clearEmailField = () => resetField('email');

  const handleEmailInputOnChange = debounce(async (e) => {
    setValue('email', e.target.value);
    setIsEmailValidating(true);
    await trigger('email');
    setIsEmailValidating(false);
  }, 300);

  return (
    <BasicInput
      {...register('email')}
      type='email'
      label='이메일'
      placeholder='이메일을 입력해주세요.'
      isValidating={mode === 'sign-up' && isEmailValidating}
      validationMessage={mode === 'sign-up' ? '이메일 검증 중...' : undefined}
      isInvalid={!!errors.email}
      errorMessage={errors.email?.message as string}
      onClear={clearEmailField}
      onChange={handleEmailInputOnChange}
      successMessage={
        mode === 'sign-up' ? '사용 가능한 이메일입니다.' : undefined
      }
    />
  );
};

export default EmailInput;
