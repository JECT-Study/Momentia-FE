import { OvalButtonProps } from '@/types';

import { bgColorClasses, hoverBgColorClasses } from './SquareButtonL';

const textColorClasses = {
  primary: 'text-white',
  secondary: 'text-gray-600',
  tertiaty: 'text-gray-300',
};

const buttonSizeClasses = {
  m: 'inline-flex h-[69px] px-[46px] py-[17px]',
  s: 'flex w-[99px] h-[50px] px-[34px] py-[20px]',
};

const OvalButton = ({
  variant = 'primary',
  buttonSize,
  children,

  onClick,
  ariaLabel,
}: OvalButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        items-center justify-center rounded-full gap-[10px]
        ${bgColorClasses[variant]}
        ${hoverBgColorClasses[variant]}
        ${textColorClasses[variant]}
        ${buttonSizeClasses[buttonSize]}
        hover:bg-opacity-80 active:bg-opacity-60 active:scale-95
        transition-all duration-300 ease-in-out
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
