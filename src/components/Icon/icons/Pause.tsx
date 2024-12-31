import { IconProps } from '@/types/iconProps';

const Pause = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6.4423 2.92383H7.1923C7.47811 2.92383 7.7098 3.15552 7.7098 3.44133V14.5338C7.7098 14.8196 7.47811 15.0513 7.1923 15.0513H6.4423C6.1565 15.0513 5.9248 14.8196 5.9248 14.5338V3.44133C5.9248 3.15552 6.1565 2.92383 6.4423 2.92383ZM10.8368 2.92383H11.5868C11.8726 2.92383 12.1043 3.15552 12.1043 3.44133V14.5338C12.1043 14.8196 11.8726 15.0513 11.5868 15.0513H10.8368C10.551 15.0513 10.3193 14.8196 10.3193 14.5338V3.44133C10.3193 3.15552 10.551 2.92383 10.8368 2.92383Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default Pause;
