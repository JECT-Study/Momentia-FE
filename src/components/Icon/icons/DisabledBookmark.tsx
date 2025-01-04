import { IconProps } from '@/types/iconProps';

const DisabledBookmark = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6.875 6.25C6.875 4.86929 7.99429 3.75 9.375 3.75H20.625C22.0057 3.75 23.125 4.86929 23.125 6.25V24.8536C23.125 25.3936 22.4864 25.6795 22.0836 25.3197L15 18.992L7.91637 25.3197C7.51365 25.6795 6.875 25.3936 6.875 24.8536V6.25Z'
        stroke='#B5B5B5'
        strokeWidth='2.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='#F5F5F5'
      />
    </svg>
  );
};

export default DisabledBookmark;
