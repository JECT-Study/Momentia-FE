import { CategoryButtonProps } from '@/types';

const CategoryButton = ({
  backgroundColor = 'bg-gray-800',
  textColor = 'text-gray-300',
  textSize,
  children,

  onClick,
  ariaLabel,
}: CategoryButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        inline-flex items-center justify-center rounded-full
        px-[56px] py-[17px] h-[69px]
        ${backgroundColor} ${textColor} ${textSize}
        hover:bg-opacity-80 active:bg-opacity-60 active:scale-95
        transition-all duration-300 ease-in-out
      `}
    >
      {children}
    </button>
  );
};

export default CategoryButton;
