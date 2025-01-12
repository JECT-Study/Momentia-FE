import { OvalButtonProps } from '@/types';

const OvalButton = ({
  variant = 'primary',
  buttonSize,
  children,

  onClick,
  ariaLabel,
}: OvalButtonProps) => {
  const bgColorClasses = {
    primary: 'bg-main',
    secondary: buttonSize === 'm' ? '' : 'bg-gray-200',
    tertiary: buttonSize === 'm' ? 'bg-gray-800' : 'bg-gray-700',
  };

  const hoverBgColorClasses = {
    primary: 'hover:bg-[#885DFF]',
    secondary: buttonSize === 'm' ? '' : 'hover:bg-gray-300',
    tertiary: '',
  };

  const textColorClasses = {
    primary: 'text-white',
    secondary: buttonSize === 'm' ? 'text-transparent' : 'text-gray-600',
    tertiary: buttonSize === 'm' ? 'text-white' : 'text-gray-300',
  };

  const buttonSizeClasses = {
    m: 'h-[69px] px-[46px] py-[17px]',
    s: 'w-[99px] h-[50px] px-[34px] py-[20px]',
  };

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        flex items-center justify-center rounded-full gap-[10px]
        transition-all duration-300 ease-in-out active:scale-95
        ${bgColorClasses[variant]}
        ${hoverBgColorClasses[variant]}
        ${textColorClasses[variant]}
        ${buttonSizeClasses[buttonSize]}
      `}
    >
      {buttonSize === 'm' ? (
        <h4>{children}</h4>
      ) : (
        <div className='button-s'>{children}</div>
      )}
    </button>
  );
};

export default OvalButton;
