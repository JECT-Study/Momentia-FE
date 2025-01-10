'use client';

import { Input } from '@nextui-org/react';
import { debounce } from 'lodash';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Icon from '../Icon/Icon';

const MAX_NICKNAME_LENGTH = 10;

const NicknameInput = () => {
  const [isNicknameValidating, setIsNicknameValidating] = useState(false);

  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  const nickname = watch('nickname');

  const currentNicknameLength = nickname.length;
  const nicknameLengthColor =
    nickname.length === 0
      ? 'text-gray-700'
      : currentNicknameLength > MAX_NICKNAME_LENGTH
        ? 'text-system-error'
        : 'text-white';

  const handleNicknameInputOnChange = debounce(async (e) => {
    setValue('nickname', e.target.value);

    setIsNicknameValidating(true);
    await trigger('nickname');
    setIsNicknameValidating(false);
  }, 300);

  return (
    <div>
      <Input
        {...register('nickname')}
        type='text'
        label='닉네임'
        labelPlacement='outside'
        placeholder='닉네임을 입력해주세요.'
        maxLength={MAX_NICKNAME_LENGTH}
        classNames={{
          label: 'custom-label top-5 !text-gray-400',
          input: 'placeholder:text-gray-700',
          inputWrapper: ['bg-gray-900', 'rounded-md', 'h-15'],
        }}
        onChange={handleNicknameInputOnChange}
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
      <div className='flex items-center mt-[3px] h-[26px]'>
        {errors.nickname ? (
          <>
            <Icon
              name='CheckCircleFilled'
              size='s'
              className='text-system-error mr-2'
            />
            <p className='button-s text-system-error'>
              {errors.nickname.message as string}
            </p>
          </>
        ) : nickname && isNicknameValidating ? (
          <>
            <Icon name='AlertCircle' size='s' className='text-gray-400 mr-2' />
            <p className='button-s text-gray-400'>이메일 검증 중...</p>
          </>
        ) : (
          !!nickname && (
            <>
              <Icon
                name='AlertCircle'
                size='s'
                className='text-system-success mr-2'
              />
              <p className='button-s text-system-success'>
                사용가능한 닉네임입니다.
              </p>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default NicknameInput;
