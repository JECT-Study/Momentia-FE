'use client';

import { debounce } from 'lodash';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import BasicInput from './BasicInput';

const MAX_NICKNAME_LENGTH = 10;

const NicknameInput = () => {
  const [isNicknameValidating, setIsNicknameValidating] = useState(false);

  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();

  const handleNicknameInputOnChange = debounce(async (e) => {
    register('nickname').onChange(e);
    setIsNicknameValidating(true);
    await trigger('nickname');
    setIsNicknameValidating(false);
  }, 300);

  return (
    <BasicInput
      {...register('nickname')}
      type='text'
      label='닉네임'
      placeholder='닉네임을 입력해주세요.'
      maxLength={MAX_NICKNAME_LENGTH}
      isValidating={isNicknameValidating}
      validationMessage='닉네임 검증 중...'
      isInvalid={!!errors.nickname}
      errorMessage={errors.nickname?.message as string}
      onChange={handleNicknameInputOnChange}
      successMessage='사용 가능한 닉네임입니다.'
      showTextLength={true}
    />
  );
};

export default NicknameInput;
