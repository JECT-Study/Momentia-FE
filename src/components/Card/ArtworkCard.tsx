'use client';

import Image from 'next/image';

import DefaultImage from '@/../public/images/defaultArtworkImage.png';
import RankingLabel from '@/../public/images/rankingLabel.png';

import { ArtworkInfoType } from '@/types';
import Icon from '../Icon/Icon';

const FOLLOWED_ARTISTS = 'followed-artists';

interface ArtworkCardProps {
  mode?: typeof FOLLOWED_ARTISTS;
  rank?: number;
  artworkInfo: ArtworkInfoType;
}

const ArtworkCard = ({ mode, rank, artworkInfo }: ArtworkCardProps) => {
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

  const modeClasses =
    mode === FOLLOWED_ARTISTS
      ? 'w-full max-w-[200px] h-[267px]'
      : 'min-w-[395px] min-h-[511px]';

  const artworkInfoClasses =
    mode === FOLLOWED_ARTISTS
      ? 'gap-[10px] px-[15px] py-[15px]'
      : 'gap-[34px] px-[42px] py-[27px]';

  return (
    <div
      className={`relative overflow-hidden group rounded-[5px] ${modeClasses}`}
    >
      <Image
        src={postImage || DefaultImage}
        alt={postImage ? `artwork-${postId}` : 'default_image'}
        fill={true}
        className={postImage ? 'object-contain' : 'object-cover'}
      />

      {rank && (
        <div className='absolute top-0 left-[63px] z-10'>
          <Image
            src={RankingLabel}
            alt='ranking-label'
            width={68}
            height={97}
          />
          <h1 className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            {formattedRank}
          </h1>
        </div>
      )}

      <div
        className={`absolute top-0 left-0 flex flex-col justify-end w-full h-full
          text-white bg-gradient-to-b from-[#00000000] to-[#000000]
          opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-5 ${artworkInfoClasses}`}
      >
        {!mode && <div className='flex flex-col gap-[70px]'></div>}
        <p className='subtitle1'>{title}</p>
        <p className='placeholder'>{nickname}</p>
        <div
          className={`button-s flex
            ${mode === FOLLOWED_ARTISTS ? 'gap-5 items-center' : 'gap-6'}`}
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
