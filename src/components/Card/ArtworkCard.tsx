'use client';

import Image from 'next/image';

import DefaultImage from '@/../public/images/defaultArtworkImage.png';
import RankingLabel from '@/../public/images/rankingLabel.png';

import Icon from '../Icon/Icon';

type FOLLOWED_ARTISTS =
  | 'followed-author'
  | 'artwork-default'
  | 'artwork-latest';

interface ArtworkCardProps {
  mode?: FOLLOWED_ARTISTS;
  rank?: number;
  artworkInfo: ArtworkInfoType;
}

const ArtworkCard = ({
  mode = 'artwork-default',
  rank,
  artworkInfo,
}: ArtworkCardProps) => {
  const {
    postId,
    title,
    postImage,
    nickname,
    viewCount,
    likeCount,
    commentCount,
    isLiked,
  } = artworkInfo;

  const formattedRank = rank && rank < 10 ? `0${rank}` : rank;

  const modeClasses: Record<string, string> = {
    'followed-author': 'w-full max-w-[200px] h-[267px]',
    'artwork-default':
      'min-w-[402px] min-h-[458px]  mobile:min-w-[512px] mobile:min-h-[584px]',
    'artwork-latest':
      'min-w-[269px] min-h-[306px] mobile:min-w-[376px] mobile:min-h-[434px]',
  };

  const artworkBoxSizeClasses: Record<string, string> = {
    'followed-author': 'gap-[10px] px-[15px] py-[15px]',
    'artwork-default': 'gap-[34px] px-[63px] py-[62px] mobile:gap-[45px]',
    'artwork-latest': 'gap-[24px] px-[45px] py-[51px] mobile:gap-[34px]',
  };

  const artworkInfoGapClass: Record<string, string> = {
    'followed-author': 'gap-[70px]',
    'artwork-default': 'gap-[70px] mobile:gap-[90px]',
    'artwork-latest': 'gap-[50px] mobile:gap-[70px],',
  };

  return (
    <div
      className={`relative overflow-hidden group rounded-[5px] ${modeClasses[mode]}`}
    >
      <Image
        src={postImage || DefaultImage}
        alt={postImage ? `artwork-${postId}` : 'default_image'}
        fill={true}
        className={postImage ? 'object-contain' : 'object-cover'}
      />

      {rank && (
        <div className='absolute top-0 left-[44px] mobile:left-[63px] z-10'>
          <Image
            className='w-[33px] h-[48px] mobile:w-[68px] mobile:h-[97px]'
            src={RankingLabel}
            alt='ranking-label'
          />
          <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-base font-medium mobile:text-[2rem] mobile:font-semibold'>
            {formattedRank}
          </p>
        </div>
      )}

      <div
        className={`absolute top-0 left-0 flex flex-col justify-end w-full h-full
          text-white bg-gradient-to-b from-[#00000000] to-[#000000]
          opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-5
          ${artworkBoxSizeClasses[mode]}`}
      >
        <div className={`flex flex-col ${artworkInfoGapClass[mode]}`}>
          <p className='subtitle1'>{title}</p>
          <p className='placeholder'>{nickname}</p>
        </div>
        <div
          className={`button-s flex
            ${mode === 'followed-author' ? 'gap-5 items-center' : 'gap-6'}`}
        >
          <div className='flex items-center gap-2.5'>
            <Icon name='Eye' size='s' />
            <span>{viewCount}</span>
          </div>
          <div className='flex items-center gap-2.5'>
            {isLiked ? (
              <Icon
                name='HeartFilled'
                size='s'
                className='flex-shrink-0 text-system-error'
              />
            ) : (
              <Icon name='Heart' size='s' />
            )}
            <span>{likeCount}</span>
          </div>
          <div className='flex items-center gap-2.5'>
            <Icon name='Message' size='s' />
            <span>{commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
