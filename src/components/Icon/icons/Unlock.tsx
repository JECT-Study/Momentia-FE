import { IconProps } from '@/types/iconProps';

import { ReactNode } from 'react';

const Unlock = ({ className, onClick }: IconProps): ReactNode => {
  return (
    <svg
      className={className}
      onClick={onClick}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M9 8.65032H17C17.7956 8.65032 18.5587 8.95061 19.1213 9.48511C19.6839 10.0196 20 10.7446 20 11.5005V18.1508C20 18.9067 19.6839 19.6317 19.1213 20.1662C18.5587 20.7007 17.7956 21.001 17 21.001H7C6.20435 21.001 5.44129 20.7007 4.87868 20.1662C4.31607 19.6317 4 18.9067 4 18.1508V11.5005C4 10.7446 4.31607 10.0196 4.87868 9.48511C5.44129 8.95061 6.20435 8.65032 7 8.65032V6.75022C7.00021 5.81143 7.29321 4.89375 7.84201 4.11305C8.3908 3.33235 9.17078 2.72365 10.0835 2.3638C10.9961 2.00395 12.0006 1.9091 12.97 2.09122C13.9393 2.27334 14.8302 2.72426 15.53 3.38705C16.1603 3.99027 16.6122 4.74068 16.84 5.56266C16.8728 5.68368 16.8802 5.80966 16.8618 5.9334C16.8434 6.05715 16.7995 6.17623 16.7327 6.28386C16.6658 6.39149 16.5773 6.48555 16.4722 6.56068C16.3671 6.63581 16.2474 6.69053 16.12 6.72172C15.9926 6.75291 15.86 6.75996 15.7298 6.74247C15.5995 6.72497 15.4742 6.68327 15.3609 6.61975C15.2476 6.55623 15.1486 6.47214 15.0695 6.37227C14.9904 6.2724 14.9328 6.15871 14.9 6.03769C14.7649 5.54349 14.4959 5.0915 14.12 4.72662C13.6999 4.32795 13.1646 4.0567 12.5821 3.94724C11.9996 3.83777 11.3959 3.89501 10.8477 4.11171C10.2994 4.3284 9.83118 4.6948 9.50226 5.1645C9.17334 5.6342 8.99854 6.18607 9 6.75022V8.65032Z'
        fill='currentColor'
      />
      <rect x='11' y='13' width='2' height='4' rx='1' fill='white' />
    </svg>
  );
};

export default Unlock;
