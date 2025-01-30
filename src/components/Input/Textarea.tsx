import { ChangeEvent, useRef } from 'react';

interface TextareaProps {
  label?: string;
  placeholder?: string;
  fadedBackground?: boolean;

  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;

  showTextLength?: boolean;
  isInvalid?: boolean;
  maxLength?: number;
  errorMessage?: string;
}

const Textarea = ({
  label,
  placeholder,
  value,
  onChange,
  maxLength,
  showTextLength,
  fadedBackground = false,
}: TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const currentTextLength = value.length;
  const textLengthColor =
    currentTextLength === 0
      ? 'text-gray-700'
      : maxLength && currentTextLength > maxLength
        ? 'text-system-error'
        : 'text-white';

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
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
          className={`placeholder rounded-md w-full h-auto resize-none
                ${value.length ? 'text-white' : 'placeholder:text-gray-700'}
                ${fadedBackground ? 'bg-gray-800' : 'bg-gray-900'}
                focus:outline-none focus:ring-0  hover:bg-[#18181b] focus:bg-[#18181b]
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
  );
};

export default Textarea;
