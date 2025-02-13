'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

import ROUTE from '@/constants/routes';
import { ArtworkInfoType } from '@/types';

import Icon from '../Icon/Icon';

type ARTWORK_CARD_MODE =
  | 'followed-artists'
  | 'artwork-default'
  | 'artwork-latest'
  | 'artwork-list';

interface ArtworkCardProps {
  mode?: ARTWORK_CARD_MODE;
  rank?: number;
  artworkInfo: ArtworkInfoType;
}

const ArtworkCard = ({
  mode = 'artwork-default',
  rank,
  artworkInfo,
}: ArtworkCardProps) => {
  const router = useRouter();

  const {
    userId,
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
    'followed-artists': 'w-full max-w-[200px] h-[267px]',
    'artwork-default':
      'min-w-[402px] min-h-[458px] mobile:min-w-[512px] mobile:min-h-[584px]',
    'artwork-latest':
      'min-w-[269px] min-h-[306px] mobile:min-w-[376px] mobile:min-h-[434px]',
    'artwork-list': 'min-w-[395px] min-h-[511px]',
  };

  const artworkBoxSizeClasses: Record<string, string> = {
    'followed-artists': 'gap-[10px] px-[15px] py-[15px]',
    'artwork-default': 'gap-[34px] px-[63px] py-[62px] mobile:gap-[45px]',
    'artwork-latest': 'gap-[24px] px-[45px] py-[51px] mobile:gap-[34px]',
    'artwork-list': 'gap-[34px] px-[42px] py-[27px]',
  };

  const artworkInfoGapClass: Record<string, string> = {
    'followed-artists': 'gap-[70px]',
    'artwork-default': 'gap-[70px] mobile:gap-[90px]',
    'artwork-latest': 'gap-[50px] mobile:gap-[70px]',
    'artwork-list': 'gap-[70px]',
  };

  const clickArtworkCard = () => {
    router.push(ROUTE.artworkDetail + `?postId=${postId}`);
  };

  const goToUserProfile = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    router.push(ROUTE.profile(userId));
  };

  return (
    <div
      className={`relative overflow-hidden group rounded-[5px] ${modeClasses[mode]} cursor-pointer`}
      onClick={clickArtworkCard}
    >
      <Image
        src={postImage || '/images/defaultArtworkImage.png'}
        alt={postImage ? `artwork-${postId}` : 'default_image'}
        fill={true}
        sizes={modeClasses[mode] || '402px'}
        className={postImage ? 'object-contain' : 'object-cover'}
      />

      {rank && (
        <div className='w-[33px] h-[48px] mobile:w-[68px] mobile:h-[97px] absolute top-0 left-[44px] mobile:left-[63px] z-10'>
          <Image
            src='/images/rankingLabel.png'
            alt='ranking-label'
            width={68}
            height={97}
            sizes='(max-width: 768px) 33px, 48px'
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
          <button
            type='button'
            className='w-fit placeholder hover:underline'
            onClick={goToUserProfile}
          >
            {nickname}
          </button>
        </div>
        <div
          className={`button-s flex
            ${mode === 'followed-artists' ? 'gap-5 items-center' : 'gap-6'}`}
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
