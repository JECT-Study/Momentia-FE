import { IconProps } from '@/types/iconProps';

const ChevronLeft = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      viewBox='0 0 60 60'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M39.7036 52.4192C39.0536 52.4192 38.4287 52.1692 37.9287 51.6942L18.4787 32.2442C17.5287 31.2942 17.5036 29.7442 18.4286 28.7442L37.7036 8.51923C38.6536 7.51923 40.2286 7.49423 41.2286 8.44423C42.2286 9.39423 42.2786 10.9692 41.3036 11.9692L23.7286 30.4192L41.4536 48.1442C42.4286 49.1192 42.4286 50.6942 41.4536 51.6692C40.9536 52.1692 40.3286 52.3942 39.6786 52.3942L39.7036 52.4192Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default ChevronLeft;
