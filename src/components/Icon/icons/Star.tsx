import { IconProps } from '@/types/iconProps';

const Star = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M17.2601 21.71C17.1001 21.71 16.9401 21.67 16.7901 21.59L11.8102 18.97L6.83015 21.59C6.49015 21.77 6.09015 21.74 5.78015 21.51C5.47015 21.29 5.32016 20.91 5.38016 20.53L6.33015 14.99L2.30016 11.06C2.03016 10.79 1.93016 10.4 2.05016 10.04C2.17016 9.68 2.48015 9.41 2.86015 9.36L8.42015 8.55L10.9102 3.51C11.2502 2.83 12.3701 2.83 12.7001 3.51L15.1902 8.55L20.7601 9.36C21.1401 9.41 21.4502 9.68 21.5702 10.04C21.6902 10.4 21.5902 10.8 21.3202 11.06L17.2901 14.99L18.2402 20.53C18.3002 20.91 18.1501 21.28 17.8401 21.51C17.6701 21.64 17.4602 21.7 17.2502 21.7L17.2601 21.71ZM11.8202 16.84C11.9802 16.84 12.1401 16.88 12.2901 16.96L15.9402 18.88L15.2402 14.82C15.1802 14.5 15.2902 14.16 15.5302 13.94L18.4801 11.06L14.4001 10.47C14.0701 10.42 13.7901 10.22 13.6501 9.92L11.8202 6.22L9.99016 9.92C9.84016 10.21 9.56016 10.42 9.24016 10.47L5.16016 11.06L8.11015 13.94C8.35015 14.17 8.45015 14.5 8.40015 14.82L7.70015 18.88L11.3502 16.96C11.5002 16.88 11.6602 16.84 11.8202 16.84Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default Star;
