'use client';

import { Input } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import useGetValidateNickName from '@/apis/user/validateNickname';
import Icon from '../Icon/Icon';

const NicknameInput = () => {
  const [validationMessage, setValidationMessage] = useState('');
  const [validationMessageColor, setValidationMessageColor] = useState('');
  const { register, watch } = useFormContext();

  const nickname = watch('nickname');

  const { isValid, message, isLoading } = useGetValidateNickName(nickname);

  const MAX_NICKNAME_LENGTH = 10;

  const isNicknameInvalid = (nickname: string) =>
    (nickname !== '' && !/^[\u3131-\u318E가-힣A-Za-z0-9]+$/.test(nickname)) ||
    nickname.length > MAX_NICKNAME_LENGTH;

  useEffect(() => {
    if (nickname === '') {
      setValidationMessage('');
      setValidationMessageColor('');
    } else if (isNicknameInvalid(nickname)) {
      setValidationMessage('사용할 수 없는 문자 또는 길이를 초과했습니다.');
      setValidationMessageColor('text-system-error');
    } else if (isLoading) {
      setValidationMessage('닉네임 검증 중...');
      setValidationMessageColor('text-gray-400');
    } else if (!isValid) {
      setValidationMessage(message || '중복된 닉네임이 존재합니다.');
      setValidationMessageColor('text-system-error');
    } else {
      setValidationMessage('사용 가능한 닉네임입니다.');
      setValidationMessageColor('text-system-success');
    }
  }, [nickname, isLoading, isValid, message]);

  const currentNicknameLength = nickname.length;
  const nicknameLengthColor =
    nickname.length === 0
      ? 'text-gray-700'
      : currentNicknameLength > MAX_NICKNAME_LENGTH
        ? 'text-system-error'
        : 'text-white';

  return (
    <div>
      <Input
        {...register('nickname', { required: true })}
        type='text'
        label='닉네임'
        labelPlacement='outside'
        placeholder='닉네임을 입력해주세요.'
        maxLength={MAX_NICKNAME_LENGTH}
        classNames={{
          label: 'custom-label text-gray-400',
          input: 'placeholder:text-gray-700',
          inputWrapper: ['bg-gray-900', 'rounded-md'],
        }}
        endContent={
          <div className='flex items-center'>
            <span className={`placeholder ${nicknameLengthColor}`}>
              {currentNicknameLength}
            </span>
            <span className='placeholder text-gray-700'>
              /{MAX_NICKNAME_LENGTH}
            </span>
          </div>
        }
      />

      {validationMessage && (
        <div className='flex items-center mt-2'>
          {validationMessageColor === 'text-system-success' ? (
            <Icon
              name='CheckCircleFilled'
              size='s'
              className='text-system-success mr-1'
            />
          ) : (
            <Icon
              name='AlertCircle'
              size='s'
              className='text-system-error mr-2'
            />
          )}
          <p className={`button-s ${validationMessageColor}`}>
            {validationMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default NicknameInput;
