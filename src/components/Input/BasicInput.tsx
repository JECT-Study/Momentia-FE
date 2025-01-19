'use client';

import { Input } from '@nextui-org/react';
import { ChangeEvent, useState } from 'react';

import Icon from '../Icon/Icon';

interface BasicInputProps {
  type?: string;
  label?: string;
  placeholder?: string;

  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;

  showClear?: boolean;
  onClear?: () => void;
  showEyeIcon?: boolean;
  showTextLength?: boolean;
  isInvalid?: boolean;
  minLength?: number;
  maxLength?: number;
  errorMessage?: string;
  successMessage?: string;
}

const BasicInput = ({
  type,
  label,
  placeholder,
  value,
  onChange,
  showClear = false,
  onClear,
  showEyeIcon = false,
  showTextLength = false,
  isInvalid = false,
  minLength,
  maxLength,
  errorMessage,
  successMessage,
}: BasicInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const currentTextLength = value.length;
  const textLengthColor =
    currentTextLength === 0
      ? 'text-gray-700'
      : maxLength && currentTextLength > maxLength
        ? 'text-system-error'
        : 'text-white';

  return (
    <div>
      <Input
        type={showEyeIcon && isPasswordVisible ? 'text' : type || 'text'}
        label={label}
        labelPlacement='outside'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onClear={showClear ? onClear : undefined}
        isInvalid={false}
        minLength={minLength}
        maxLength={maxLength}
        endContent={
          <>
            {showEyeIcon && (
              <button
                type='button'
                aria-label='toggle password visibility'
                onClick={togglePasswordVisibility}
                disabled={value === ''}
                className='px-[10px]'
              >
                <Icon
                  name={isPasswordVisible ? 'Eye' : 'EyeOff'}
                  size='m'
                  className={`text-gray-200 ${value === '' ? 'text-gray-800' : ''}`}
                />
              </button>
            )}

            {showTextLength && maxLength && (
              <div className='flex items-center px-[10px]'>
                <span className={`placeholder ${textLengthColor}`}>
                  {currentTextLength}
                </span>
                <span className='placeholder text-gray-700'>/{maxLength}</span>
              </div>
            )}
          </>
        }
        classNames={{
          label: ['!placeholder', '!top-5', '!text-gray-400'],
          input: ['!placeholder', 'placeholder:text-gray-700', 'px-[10px]'],
          inputWrapper: ['bg-gray-900', 'rounded-md', 'h-[60px]'],
        }}
      />

      <div className='flex items-center mt-[3px] h-[26px]'>
        {isInvalid && errorMessage ? (
          <>
            <Icon
              name='AlertCircle'
              size='s'
              className='text-system-error mr-2'
            />
            <p className='button-s text-system-error'>{errorMessage}</p>
          </>
        ) : (
          successMessage && (
            <>
              <Icon
                name='CheckCircleFilled'
                size='s'
                className='text-gray-400 mr-2'
              />
              <p className='button-s text-system-success'>{successMessage}</p>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default BasicInput;
