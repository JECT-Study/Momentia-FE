import { ReactNode } from 'react';

import { IconProps } from '@/types/iconProps';

const Close = ({ className, onClick }: IconProps): ReactNode => {
  return (
    <svg
      className={className}
      onClick={onClick}
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M22.8085 24.4906C23.0585 24.7281 23.371 24.8531 23.696 24.8531C24.021 24.8531 24.3335 24.7281 24.5835 24.4906C25.071 24.0156 25.071 23.2156 24.5835 22.7281L16.9478 15.0482L25.0079 7.17975C25.5079 6.70475 25.5204 5.91725 25.0329 5.41725C24.5579 4.91725 23.7704 4.91725 23.2704 5.39225L15.1902 13.2805L7.321 5.36562C6.8335 4.87812 6.046 4.87812 5.5585 5.36562C5.071 5.84062 5.071 6.64062 5.5585 7.12812L13.4037 15.0245L5.38295 22.8547C4.88295 23.3297 4.87045 24.1172 5.35795 24.6172C5.60795 24.8672 5.93295 24.9922 6.25795 24.9922V24.9797C6.57045 24.9797 6.89545 24.8672 7.13295 24.6297L15.1607 16.7929L22.8085 24.4906Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default Close;
