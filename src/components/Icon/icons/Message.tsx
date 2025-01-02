import { IconProps } from '@/types/iconProps';

const Message = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M15 26.25L18.0571 20.3804H23.75C25.1307 20.3804 26.25 19.2611 26.25 17.8804V6.25C26.25 4.86929 25.1307 3.75 23.75 3.75H6.25C4.86929 3.75 3.75 4.86929 3.75 6.25V17.8804C3.75 19.2611 4.86929 20.3804 6.25 20.3804H12.1875L15 26.25Z'
        stroke='currentColor'
        strokeWidth='2.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='transparent'
      />
    </svg>
  );
};

export default Message;
