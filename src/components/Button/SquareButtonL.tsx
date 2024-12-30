import { SquareButtonLProps } from '@/types';

export const bgColorClasses = {
  primary: 'bg-main',
  secondary: 'bg-gray-200',
  tertiaty: 'bg-gray-800',
};

export const hoverBgColorClasses = {
  primary: 'hover:bg-[#885DFF]',
  secondary: 'hover:bg-gray-300',
  tertiaty: 'hover:bg-gray-700',
};

const textColorClasses = {
  primary: 'text-white',
  secondary: 'text-gray-500',
  tertiaty: 'text-gray-300',
};

const SquareButtonL = ({
  variant = 'tertiaty',
  children,

  onClick,
  ariaLabel,
  disabled = false,
  loading = false,
  icon,
  iconPosition,
  type = 'button',
}: SquareButtonLProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      className={`
        button-m flex items-center justify-center rounded-md
        w-[420px] h-[70px] px-[175px] py-[20px] gap-[20px]
        ${bgColorClasses[variant]} 
        ${textColorClasses[variant]} 
        ${hoverBgColorClasses[variant]}
        ${disabled ? 'cursor-not-allowed' : ''}
        hover:bg-opacity-80 active:bg-opacity-60 active:scale-95
        transition-all duration-300 ease-in-out
      `}
    >
      {loading && <span>로딩중...</span>}
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </button>
  );
};

export default SquareButtonL;
