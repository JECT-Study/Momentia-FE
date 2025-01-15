import { SquareButtonLProps } from '@/types';

const SquareButtonL = ({
  variant = 'tertiary',
  children,

  onClick,
  ariaLabel,
  disabled = false,
  loading = false,
  icon,
  iconPosition,
  type = 'button',
}: SquareButtonLProps) => {
  const bgColorClasses = {
    primary: 'bg-main',
    secondary: 'bg-gray-200',
    tertiary: 'bg-gray-800',
  };

  const hoverBgColorClasses = {
    primary: 'hover:bg-[#885DFF]',
    secondary: 'hover:bg-gray-300',
    tertiary: 'hover:bg-gray-700',
  };

  const textColorClasses = {
    primary: 'text-white',
    secondary: 'text-gray-500',
    tertiary: 'text-gray-300',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      className={`
        button-m flex items-center justify-center rounded-md
        w-full h-[70px]  py-[20px] gap-[20px]
        transition-all duration-300 ease-in-out active:scale-95
        ${disabled ? bgColorClasses['secondary'] : bgColorClasses[variant]} 
        ${disabled ? 'cursor-not-allowed' : hoverBgColorClasses[variant]}
        ${disabled ? textColorClasses['secondary'] : textColorClasses[variant]} 
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
