import { ReactNode } from 'react';

const Lock = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}): ReactNode => {
  return (
    <svg
      className={className}
      onClick={onClick}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M17 9.65V7.75C17 6.49022 16.4732 5.28204 15.5355 4.39124C14.5979 3.50044 13.3261 3 12 3C10.6739 3 9.40215 3.50044 8.46447 4.39124C7.52678 5.28204 7 6.49022 7 7.75V9.65C6.20435 9.65 5.44129 9.95027 4.87868 10.4847C4.31607 11.0192 4 11.7441 4 12.5V19.15C4 19.9059 4.31607 20.6308 4.87868 21.1653C5.44129 21.6997 6.20435 22 7 22H17C17.7956 22 18.5587 21.6997 19.1213 21.1653C19.6839 20.6308 20 19.9059 20 19.15V12.5C20 11.7441 19.6839 11.0192 19.1213 10.4847C18.5587 9.95027 17.7956 9.65 17 9.65ZM9 7.75C9 6.99413 9.31607 6.26922 9.87868 5.73475C10.4413 5.20027 11.2044 4.9 12 4.9C12.7956 4.9 13.5587 5.20027 14.1213 5.73475C14.6839 6.26922 15 6.99413 15 7.75V9.65H9V7.75Z'
        fill='currentColor'
      />
      <rect x='11' y='14' width='2' height='4' rx='1' fill='white' />
    </svg>
  );
};

export default Lock;
