'use client';

import Image from 'next/image';

import DefaultImage from '@/../public/images/defaultArtworkImage.png';
import RankingLabel from '@/../public/images/rankingLabel.png';

import Eye from '../Icon/icons/Eye';
import Heart from '../Icon/icons/Heart';
import HeartFilled from '../Icon/icons/HeartFilled';
import Message from '../Icon/icons/Message';

interface ArtworkCardProps {
  mode?: 'followed-author' | 'artwork-list';
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
    mode === 'followed-author'
      ? 'w-[200px] h-[267px] flex-shrink-0 rounded-[5px]'
      : 'relative min-w-[395px] min-h-[511px]';

  return (
    <div className={`overflow-hidden group rounded-[5px] ${modeClasses}`}>
      {postImage ? (
        <Image
          src={postImage}
          alt={`artwork-${postId}`}
          fill={true}
          className='object-contain'
        />
      ) : (
        <Image
          src={DefaultImage}
          alt='default_image'
          className='object-cover'
          fill={true}
        />
      )}

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
        className='absolute top-0 left-0 flex flex-col justify-end gap-[34px] w-full h-full 
          px-[42px] py-[27px] bg-gradient-to-b from-[#00000000] to-[#000000] 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-5'
      >
        <div className='flex flex-col gap-[70px]'></div>
        <p className='subtitle1'>{title}</p>
        <p className='placeholder'>{nickname}</p>
        <div className='button-s flex gap-6'>
          <div className='flex gap-2.5 items-center'>
            <Eye className='w-[18px] h-[18px]' />
            <p>{viewCount}</p>
          </div>
          <div className='flex gap-2.5 items-center'>
            {isLiked ? (
              <HeartFilled className='text-system-error w-[18px] h-[18px]' />
            ) : (
              <Heart className='w-[18px] h-[18px]' />
            )}
            <p>{likeCount}</p>
          </div>
          <div className='flex gap-2.5 items-center'>
            <Message className='w-[18px] h-[18px]' />
            <p>{commentCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
