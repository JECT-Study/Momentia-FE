'use client';

import { Input } from '@nextui-org/react';

import { useEffect, useState } from 'react';

import { useFormContext } from 'react-hook-form';

import Icon from '../Icon/Icon';

const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{9,}$/;

interface PasswordnputProps {
  mode: 'sign-up' | 'sign-in';
}

const PasswordInput = ({ mode }: PasswordnputProps) => {
  const [validationMessage, setValidationMessage] = useState('');
  const [validationMessageColor, setValidationMessageColor] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const password = watch('password');

  const isPasswordInvalid = (password: string) =>
    password !== '' &&
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{9,}$/.test(
      password,
    );

  useEffect(() => {
    if (mode !== 'sign-up') return;

    if (isPasswordInvalid(password)) {
      setValidationMessage(
        '영문, 숫자, 특수문자를 포함해 9자 이상 입력해주세요.',
      );
      setValidationMessageColor('text-system-error');
    } else if (password) {
      setValidationMessage('사용 가능한 비밀번호입니다.');
      setValidationMessageColor('text-system-success');
    } else {
      setValidationMessage('');
    }
  }, [password]);

  useEffect(() => {
    if (errors.password) {
      setValidationMessage(errors.password?.message as string);
      setValidationMessageColor('text-system-error');
    }
  }, [errors]);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  return (
    <div>
      <Input
        {...register('password', {
          required: true,
          pattern: PASSWORD_REGEX,
        })}
        type={isPasswordVisible ? 'text' : 'password'}
        label='비밀번호'
        labelPlacement='outside'
        placeholder='비밀번호를 입력해주세요.'
        classNames={{
          label: 'custom-label text-gray-400',
          input: 'placeholder:text-gray-700',
          inputWrapper: ['bg-gray-900', 'rounded-md'],
        }}
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

export default PasswordInput;
