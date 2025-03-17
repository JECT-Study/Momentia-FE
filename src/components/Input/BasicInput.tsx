'use client';

import { Input } from '@nextui-org/react';
import { ChangeEvent, Ref, useRef, useState } from 'react';

import Icon from '../Icon/Icon';

interface BasicInputProps {
  type?: string;
  label?: string;
  placeholder?: string;
  commentBackground?: boolean;

  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;

  showClear?: boolean;
  onClear?: () => void;
  showEyeIcon?: boolean;
  showTextLength?: boolean;
  isInvalid?: boolean;
  isValidating?: boolean;
  validationMessage?: string;
  minLength?: number;
  maxLength?: number;
  errorMessage?: string;
  successMessage?: string;
  className?: string;
  ref?: Ref<HTMLInputElement>;
}

const BasicInput = ({
  type,
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  showClear = false,
  onClear,
  showEyeIcon = false,
  showTextLength = false,
  isInvalid = false,
  isValidating = false,
  validationMessage,
  commentBackground = false,
  minLength,
  maxLength,
  errorMessage,
  successMessage,
  className,
  ref,
  ...props
}: BasicInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [uncontrolledLength, setUncontrolledLength] = useState(
    defaultValue?.length || 0,
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = value !== undefined;
  const inputValue = isControlled ? value : defaultValue || '';

  const currentTextLength = isControlled
    ? inputValue.length
    : uncontrolledLength;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled && inputRef.current) {
      setUncontrolledLength(inputRef.current.value.length);
    }

    if (onChange) {
      onChange(e);
    }
  };

  const textLengthColor =
    currentTextLength === 0
      ? 'text-gray-700'
      : maxLength && currentTextLength > maxLength
        ? 'text-system-error'
        : 'text-white';

  return (
    <div className={className}>
      <Input
        ref={(node) => {
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            (ref as { current: HTMLInputElement | null }).current = node;
          }

          inputRef.current = node;
        }}
        type={showEyeIcon && isPasswordVisible ? 'text' : type || 'text'}
        label={label}
        labelPlacement='outside'
        placeholder={placeholder}
        value={isControlled ? value : undefined}
        defaultValue={!isControlled ? defaultValue : undefined}
        onChange={handleInputChange}
        onClear={showClear ? onClear : undefined}
        isInvalid={isInvalid}
        minLength={minLength}
        maxLength={maxLength}
        endContent={
          <>
            {showEyeIcon && (
              <button
                type='button'
                aria-label='toggle password visibility'
                onClick={togglePasswordVisibility}
                className='px-[10px]'
              >
                <Icon
                  name={isPasswordVisible ? 'Eye' : 'EyeOff'}
                  size='m'
                  className={`text-gray-200 ${!inputValue && isControlled ? 'text-gray-800' : ''}`}
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
          inputWrapper: [
            commentBackground ? '!bg-gray-800' : '!bg-gray-900',
            'rounded-md',
            'h-[60px]',
            isInvalid ? '!border-none !ring-0 !shadow-none' : '',
            'group [data-focus="true"]',
            'group-data-[focus=true]:!bg-gray-900',
            'group-data-[focus=true]:hover:!bg-gray-900',
            'data-[hover=true]:!bg-gray-900',
          ],
        }}
        {...props}
      />

      <div className='flex items-center mt-[3px] h-[26px]'>
        {isValidating ? (
          <>
            <Icon name='AlertCircle' size='s' className='text-gray-400 mr-2' />
            <p className='button-s text-gray-400'>
              {validationMessage || '검증 중...'}
            </p>
          </>
        ) : isInvalid && errorMessage ? (
          <>
            <Icon
              name='AlertCircle'
              size='s'
              className='text-system-error mr-2'
            />
            <p className='button-s text-system-error'>{errorMessage}</p>
          </>
        ) : (
          ((isControlled && inputValue) ||
            (!isControlled && uncontrolledLength > 0)) &&
          successMessage && (
            <>
              <Icon
                name='CheckCircleFilled'
                size='s'
                className='text-system-success mr-2'
              />
              <p className='button-s text-system-success'>{successMessage}</p>
            </>
          )
        )}
      </div>
    </div>
  );
};

BasicInput.displayName = 'BasicInput';
export default BasicInput;
