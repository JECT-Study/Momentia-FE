'use client';

import { Input } from '@nextui-org/react';
import { debounce } from 'lodash';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Icon from '../Icon/Icon';

interface PasswordnputProps {
  mode: 'sign-up' | 'sign-in';
}

const PasswordInput = ({ mode }: PasswordnputProps) => {
  const [isPasswordValidating, setIsPasswordValidating] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  const password = watch('password');

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const handlePasswordInputOnChange = debounce(async (e) => {
    setValue('password', e.target.value);

    setIsPasswordValidating(true);
    await trigger('password');
    setIsPasswordValidating(false);
  }, 300);

  return (
    <div>
      <Input
        {...register('password')}
        type={isPasswordVisible ? 'text' : 'password'}
        label='비밀번호'
        labelPlacement='outside'
        placeholder='비밀번호를 입력해주세요.'
        classNames={{
          label: 'custom-label top-5 !text-gray-400',
          input: 'placeholder:text-gray-700',
          inputWrapper: ['bg-gray-900', 'rounded-md', 'h-15'],
        }}
        onChange={handlePasswordInputOnChange}
        endContent={
          <button
            type='button'
            aria-label='toggle password visibility'
            onClick={togglePasswordVisibility}
            disabled={password === ''}
          >
            {isPasswordVisible ? (
              <Icon
                name='Eye'
                size='m'
                className={`text-gray-200 ${password === '' ? 'text-gray-800' : ''}`}
              />
            ) : (
              <Icon
                name='EyeOff'
                size='m'
                className={`text-gray-200 ${password === '' ? 'text-gray-800' : ''}`}
              />
            )}
          </button>
        }
      />
      <div className='flex items-center mt-[3px] h-[26px]'>
        {errors.password ? (
          <>
            <Icon
              name='CheckCircleFilled'
              size='s'
              className='text-system-error mr-2'
            />
            <p className='button-s text-system-error'>
              {errors.password.message as string}
            </p>
          </>
        ) : (
          mode === 'sign-up' &&
          (password && isPasswordValidating ? (
            <>
              <Icon
                name='AlertCircle'
                size='s'
                className='text-gray-400 mr-2'
              />
              <p className='button-s text-gray-400'>패스워드 검증 중...</p>
            </>
          ) : (
            !!password && (
              <>
                <Icon
                  name='AlertCircle'
                  size='s'
                  className='text-system-success mr-2'
                />
                <p className='button-s text-system-success'>
                  사용가능한 비밀번호입니다.
                </p>
              </>
            )
          ))
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
