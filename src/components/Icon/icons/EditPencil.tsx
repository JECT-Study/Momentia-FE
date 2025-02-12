import { IconProps } from '@/types/iconProps';

const EditPencil = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M15 26.2031H25.5M18.2812 7.17187L22.875 11.1094M6.46875 18.9844L19.4093 5.59187C20.8026 4.19854 23.0617 4.19854 24.455 5.59187C25.8483 6.9852 25.8483 9.24423 24.455 10.6376L11.0625 23.5781L4.5 25.5469L6.46875 18.9844Z'
        stroke='inherit'
        strokeWidth='2.1875'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
      />
    </svg>
  );
};

export default EditPencil;
