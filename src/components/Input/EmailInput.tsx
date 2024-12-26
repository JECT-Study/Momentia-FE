'use client';

import { Input } from '@nextui-org/react';

import { useFormContext } from 'react-hook-form';
import Icon from '../Icon/Icon';

interface EmailInputProps {
  mode: 'sign-up' | 'sign-in';
}

const EmailInput = ({ mode }: EmailInputProps) => {
  const {
    register,
    resetField,
    watch,
    formState: { errors, isValidating },
  } = useFormContext();

  const email = watch('email');

  const clearEmailField = () => resetField('email');

  return (
    <div>
      <Input
        {...register('email')}
        type='email'
        label='이메일'
        labelPlacement='outside'
        placeholder='이메일을 입력해주세요.'
        isInvalid={false}
        classNames={{
          label: 'custom-label',
          input: 'placeholder:text-gray-700',
          inputWrapper: ['bg-gray-900', 'rounded-md'],
        }}
        onClear={clearEmailField}
      />

      <div className='flex items-center mt-2'>
        {errors.email ? (
          <>
            <Icon
              name='CheckCircleFilled'
              size='s'
              className='text-system-error mr-2'
            />
            <p className='button-s text-system-error'>
              {errors.email.message as string}
            </p>
          </>
        ) : (
          mode === 'sign-up' &&
          !isValidating &&
          !!email && (
            <>
              <Icon
                name='AlertCircle'
                size='s'
                className='text-system-success mr-2'
              />
              <p className='button-s text-system-success'>
                사용가능한 이메일입니다.
              </p>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default EmailInput;
