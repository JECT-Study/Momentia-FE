import { IconProps } from '@/types/iconProps';

const AlertCircle = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='12' cy='12' r='11' fill='currentColor' />
      <rect x='11' y='6' width='2' height='8' rx='1' fill='white' />
      <rect x='11' y='16' width='2' height='2' rx='1' fill='white' />
    </svg>
  );
};

export default AlertCircle;
