'use client';

import { Input } from '@nextui-org/react';
import { ChangeEvent, useRef, useState } from 'react';

import Icon from '../Icon/Icon';

interface BasicInputProps {
  type?: string;
  label?: string;
  placeholder?: string;

  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

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
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const currentTextLength = value.length;
  const textLengthColor =
    currentTextLength === 0
      ? 'text-gray-700'
      : maxLength && currentTextLength > maxLength
        ? 'text-system-error'
        : 'text-white';

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange(e);
    if (type === 'textarea' && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div>
      {type === 'textarea' ? (
        <>
          <label className='placeholder block pb-[7px] text-gray-400'>
            {label}
          </label>
          <div className='relative w-full h-auto'>
            <textarea
              ref={textareaRef}
              value={value}
              onChange={handleInputChange}
              placeholder={placeholder}
              maxLength={maxLength}
              className={`placeholder bg-gray-900 rounded-md w-full h-auto resize-none
      ${value.length ? 'text-white' : 'placeholder:text-gray-700'}
      ${isInvalid ? 'border border-system-error' : 'border border-transparent'} 
      focus:outline-none focus:ring-0 bg-gray-900 hover:bg-[#18181b] focus:bg-[#18181b]
    `}
              style={{
                minHeight: '256px',
                padding: '20px',
              }}
            />
            {showTextLength && maxLength && (
              <div className='absolute bottom-[20px] right-[20px]'>
                <span className={`placeholder ${textLengthColor}`}>
                  {currentTextLength}
                </span>
                <span className='placeholder text-gray-700'>/{maxLength}</span>
              </div>
            )}
          </div>
        </>
      ) : (
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
                  <span className='placeholder text-gray-700'>
                    /{maxLength}
                  </span>
                </div>
              )}
            </>
          }
          classNames={{
            label: ['!placeholder', '!top-5', '!text-gray-400'],
            input: ['!placeholder', 'placeholder:text-gray-700', 'px-[10px]'],
            inputWrapper: [
              'bg-gray-900',
              'rounded-md',
              'h-15',
              'leading-[60px]',
            ],
          }}
        />
      )}
      <div className='flex items-center mt-[3px] h-[26px]'>
        {isInvalid && errorMessage ? (
          <>
            <Icon
              name='CheckCircleFilled'
              size='s'
              className='text-system-error mr-2'
            />
            <p className='button-s text-system-error'>{errorMessage}</p>
          </>
        ) : (
          successMessage && (
            <>
              <Icon
                name='AlertCircle'
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
