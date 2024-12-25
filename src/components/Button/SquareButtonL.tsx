import { SquareButtonLProps } from '@/types';

const SquareButtonL = ({
  backgroundColor = 'bg-gray-800',
  textColor = 'text-white',
  textSize,
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
        flex items-center justify-center rounded-md
        w-[420px] h-[70px] gap-2
        ${backgroundColor} ${textColor} ${textSize}
        ${disabled ? 'text-gray-700 cursor-not-allowed' : ''}
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
