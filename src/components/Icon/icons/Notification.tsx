import { IconProps } from '@/types/iconProps';

const Notification = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M11.6667 25.1136C12.5513 25.8203 13.7194 26.25 15 26.25C16.2806 26.25 17.4487 25.8203 18.3333 25.1136M5.63454 21.4772C5.10753 21.4772 4.81318 20.6493 5.13197 20.1893C5.8717 19.1219 6.58569 17.5564 6.58569 15.6712L6.6162 12.9396C6.6162 7.86431 10.3698 3.75 15 3.75C19.6984 3.75 23.5073 7.92492 23.5073 13.0749L23.4768 15.6712C23.4768 17.5694 24.1661 19.1434 24.8758 20.2112C25.1823 20.6724 24.8872 21.4772 24.3667 21.4772H5.63454Z'
        stroke='currentColor'
        strokeWidth='2.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='transparent'
      />
    </svg>
  );
};

export default Notification;
