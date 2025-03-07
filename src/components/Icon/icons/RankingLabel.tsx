import { IconProps } from '@/types/iconProps';

const RankingLabel = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 62 95'
      fill='none'
    >
      <path
        data-figma-bg-blur-radius='8'
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M6 0C2.68629 0 0 2.68629 0 6V88.0808C0 92.7526 5.10369 95.6321 9.1025 93.2164L27.8975 81.8621C29.8053 80.7095 32.1947 80.7095 34.1025 81.8621L52.8975 93.2164C56.8963 95.6321 62 92.7526 62 88.0808V6C62 2.68629 59.3137 0 56 0H41.4702H20.5298H6Z'
        fill='#1B1B1B'
      />
      <defs>
        <clipPath id='bgblur_0_2927_12521_clip_path' transform='translate(8 8)'>
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M6 0C2.68629 0 0 2.68629 0 6V88.0808C0 92.7526 5.10369 95.6321 9.1025 93.2164L27.8975 81.8621C29.8053 80.7095 32.1947 80.7095 34.1025 81.8621L52.8975 93.2164C56.8963 95.6321 62 92.7526 62 88.0808V6C62 2.68629 59.3137 0 56 0H41.4702H20.5298H6Z'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default RankingLabel;
