'use client';

import { Input } from '@nextui-org/react';

import { useEffect, useState } from 'react';

import { useFormContext } from 'react-hook-form';

import useGetValidateEmail from '@/apis/user/validateEmail';
import Icon from '../Icon/Icon';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

interface EmailInputProps {
  mode: 'sign-up' | 'sign-in';
}

const EmailInput = ({ mode }: EmailInputProps) => {
  const [validationMessage, setValidationMessage] = useState('');
  const [validationMessageColor, setValidationMessageColor] = useState('');
  const {
    register,
    resetField,
    watch,
    formState: { errors },
  } = useFormContext();

  const email = watch('email');

  const { isValid, message, isLoading } = useGetValidateEmail(email, mode);

  const isEmailInvalid = () => !EMAIL_REGEX.test(email);

  const clearEmailField = () => resetField('email');

  const validateEmail = () => {
    if (isLoading) {
      setValidationMessage('이메일 검증 중...');
      setValidationMessageColor('text-gray-400');
    } else if (!isValid) {
      setValidationMessage(message || '이미 가입된 이메일입니다.');
      setValidationMessageColor('text-system-error');
    } else {
      setValidationMessage('가입되어 있지 않은 이메일입니다.');
      setValidationMessageColor('text-system-error');
    }
  };

  useEffect(() => {
    if (mode !== 'sign-up') return;

    if (email === '') {
      setValidationMessage('');
      setValidationMessageColor('');
    } else if (isEmailInvalid()) {
      setValidationMessage('올바른 이메일 형식으로 입력해주세요.');
      setValidationMessageColor('text-system-error');
    } else if (email) {
      validateEmail();
    } else {
      setValidationMessage('');
    }
  }, [email]);

  useEffect(() => {
    if (errors.email) {
      setValidationMessage(errors.email?.message as string);
      setValidationMessageColor('text-system-error');
    }
  }, [errors]);

  return (
    <div>
      <Input
        {...register('email', { required: true, pattern: EMAIL_REGEX })}
        type='email'
        label='이메일'
        labelPlacement='outside'
        placeholder='이메일을 입력해주세요.'
        isInvalid={false}
        classNames={{
          label: 'custom-label text-gray-400',
          input: 'placeholder:text-gray-700',
          inputWrapper: ['bg-gray-900', 'rounded-md'],
        }}
        onClear={clearEmailField}
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

export default EmailInput;
