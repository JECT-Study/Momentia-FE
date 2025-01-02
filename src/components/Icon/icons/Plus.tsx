import { IconProps } from '@/types/iconProps';

const Plus = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12.0001 4.8L12 19.2M19.2 12L4.80005 12'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        fill='currentColor'
      />
    </svg>
  );
};

export default Plus;
