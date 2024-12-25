'use client';

import { useEffect, useRef, useState } from 'react';

import Icon from '../Icon/Icon';

interface FilterDropdownProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

const FilterDropdown = ({
  options,
  selected,
  onChange,
}: FilterDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionSelect = (option: string) => {
    onChange(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className='body2 relative inline-block text-left' ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-label={`Currently selected filter: ${selected}`}
        aria-expanded={isDropdownOpen}
        className='flex items-center justify-between w-[149px] h-[44px] px-[23px] py-[10px]
        text-white bg-gray-900 rounded-[5px] gap-[36px] shadow-sm
        hover:bg-gray-800 focus:outline-none'
      >
        {selected}
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
          className='w-full mt-3 bg-gray-900 rounded-[5px] shadow-lg'
          role='menu'
        >
          <ul className='py-1'>
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionSelect(option)}
                aria-current={option === selected ? 'true' : undefined}
                className={`block w-[149px] h-[44px] px-[23px] py-[10px]
                  text-gray-400 cursor-pointer
                  ${option === selected && isDropdownOpen ? 'text-white' : 'text-gray-400'}
                  hover:bg-gray-800`}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
