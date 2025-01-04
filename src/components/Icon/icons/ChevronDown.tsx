import { IconProps } from '@/types/iconProps';

const ChevronDown = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M15.1965 21C14.8886 21 14.5807 20.8803 14.3467 20.6275L4.38368 10.3845C3.89107 9.879 3.86644 9.04093 4.34673 8.50883C4.81471 7.97672 5.60289 7.96342 6.08318 8.46892L15.1718 17.8207L23.9033 8.3891C24.3836 7.8703 25.1595 7.8703 25.6398 8.3891C26.1201 8.9079 26.1201 9.74597 25.6398 10.2648L16.0585 20.6142C15.8245 20.8803 15.5043 21 15.1841 21H15.1965Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default ChevronDown;
