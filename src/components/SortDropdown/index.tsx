'use client';

import { useState } from 'react';

import useClickOutside from '@/hooks/clientStateHooks/useClickOutside';

import Icon from '../Icon/Icon';

interface SortDropdownProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;

  label?: string;
  placeholder?: string;
  isInvalid?: boolean;
  errorMessage?: string;
  className?: string;
}

const SortDropdown = ({
  options,
  selected,
  onChange,
  label,
  placeholder,
  isInvalid = false,
  errorMessage,
  className,
}: SortDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useClickOutside<HTMLDivElement>(() =>
    setIsDropdownOpen(false),
  );

  const handleOptionSelect = (option: string) => {
    onChange(option);
    setIsDropdownOpen(false);
  };

  return (
    <div
      className={`body2 relative inline-block text-left ${className}`}
      ref={dropdownRef}
    >
      {label && (
        <label className='placeholder block pb-[7px] text-gray-400'>
          {label}
        </label>
      )}

      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-label={`Currently selected sort: ${selected || placeholder}`}
        aria-expanded={isDropdownOpen}
        className={`flex items-center justify-between px-[20px] leading-[60px]
        text-white bg-gray-900 rounded-[5px] gap-[36px] shadow-sm
        hover:bg-gray-800 focus:outline-none
        ${className}
        `}
      >
        {selected || (
          <span className='placeholder text-gray-700'>{placeholder}</span>
        )}
        <span className='text-gray-700'>
          {isDropdownOpen ? (
            <Icon name='Dropup' size='m' />
          ) : (
            <Icon name='Dropdown' size='m' />
          )}
        </span>
      </button>

      {isDropdownOpen && (
        <div
          className={`absolute z-10 mt-3 bg-gray-900 rounded-[5px] shadow-lg ${className}`}
          role='menu'
        >
          <ul className='py-1'>
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionSelect(option)}
                aria-current={option === selected ? 'true' : undefined}
                className={`block px-[23px] leading-[60px]
                  text-gray-400 cursor-pointer
                  ${option === selected && isDropdownOpen ? 'text-white' : 'text-gray-400'}
                  hover:bg-background-overlay`}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}

      {isInvalid && errorMessage && (
        <div className='flex items-center mt-[3px] h-[26px]'>
          <Icon
            name='AlertCircle'
            size='s'
            className='text-system-error mr-2'
          />
          <p className='button-s text-system-error'>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
