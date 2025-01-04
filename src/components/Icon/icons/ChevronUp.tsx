import { IconProps } from '@/types/iconProps';

const ChevronUp = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.10211 16.8714C3.84211 16.8714 3.59211 16.7714 3.39211 16.5814C3.00211 16.1914 3.00211 15.5614 3.39211 15.1714L11.1721 7.39137C11.5521 7.01137 12.1721 7.00137 12.5721 7.37137L20.6621 15.0814C21.0621 15.4614 21.0821 16.0914 20.6921 16.4914C20.3121 16.8914 19.6821 16.9114 19.2821 16.5214L11.9021 9.49137L4.81211 16.5814C4.61211 16.7814 4.36211 16.8714 4.10211 16.8714Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default ChevronUp;
