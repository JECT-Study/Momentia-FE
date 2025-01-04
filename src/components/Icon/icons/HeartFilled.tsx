import { IconProps } from '@/types/iconProps';

const HeartFilled = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3.38449 6.05998L3.35413 6.1207C1.3808 9.06551 1.57814 12.9514 3.85505 15.6686L12.735 26.2638C14.0101 27.7818 16.3477 27.7818 17.6228 26.2638L26.4876 15.623C28.7797 12.8755 28.9467 8.94407 26.9126 5.99926C24.1651 2.03743 18.3059 2.00707 15.5128 5.93854L15.3914 6.10552C15.2852 6.25731 15.0575 6.25731 14.9512 6.10552L14.7539 5.84747C11.9001 1.96153 6.05606 2.06779 3.3693 6.07516L3.38449 6.05998Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default HeartFilled;
