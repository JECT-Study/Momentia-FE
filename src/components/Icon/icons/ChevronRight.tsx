import { IconProps } from '@/types/iconProps';

const ChevronRight = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      viewBox='0 0 60 60'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M20.2964 52.4192C20.9464 52.4192 21.5713 52.1692 22.0713 51.6942L41.5213 32.2442C42.4713 31.2942 42.4964 29.7442 41.5714 28.7442L22.2964 8.51923C21.3464 7.51923 19.7714 7.49423 18.7714 8.44423C17.7714 9.39423 17.7214 10.9692 18.6964 11.9692L36.2714 30.4192L18.5464 48.1442C17.5714 49.1192 17.5714 50.6942 18.5464 51.6692C19.0464 52.1692 19.6714 52.3942 20.3214 52.3942L20.2964 52.4192Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default ChevronRight;
