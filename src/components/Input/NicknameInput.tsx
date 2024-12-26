'use client';

import { Input } from '@nextui-org/react';
import { useFormContext } from 'react-hook-form';

import Icon from '../Icon/Icon';

const MAX_NICKNAME_LENGTH = 10;

const NicknameInput = () => {
  const {
    register,
    watch,
    formState: { errors, isValidating },
  } = useFormContext();

  const nickname = watch('nickname');

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
        {...register('nickname')}
        type='text'
        label='닉네임'
        labelPlacement='outside'
        placeholder='닉네임을 입력해주세요.'
        maxLength={MAX_NICKNAME_LENGTH}
        classNames={{
          label: 'custom-label',
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
      <div className='flex items-center mt-2'>
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
        ) : (
          !!nickname &&
          !isValidating && (
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
