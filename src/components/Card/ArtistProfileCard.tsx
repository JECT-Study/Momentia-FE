'use client';

import Image from 'next/image';

import DefaultProfileImage from '@/../public/images/defaultProfileImage.png';
import RankingLabel from '@/../public/images/rankingLabel.png';
import { ArtistInfoType } from '@/types/artist';

import FollowButton from '../Button/FollowButton';

interface ArtistProfileCardProps {
  rank: number;
  artistInfo: ArtistInfoType;
}

const ArtistProfileCard = ({ rank, artistInfo }: ArtistProfileCardProps) => {
  const {
    userId,
    profileImage,
    nickname,
    userField,
    introduction,
    isFollow,
    artworkImage,
  } = artistInfo;

  const formattedRank = rank < 10 ? `0${rank}` : rank;

  return (
    <div className='relative w-[346px] h-[330px] rounded-[10px] overflow-hidden'>
      {/* badge */}
      <div className='absolute left-[30px] top-0 z-10 w-[33px] h-[48px]'>
        <Image
          src={RankingLabel}
          alt='ranking label'
          width={68}
          height={97}
          style={{ width: '33px', height: 'auto' }}
        />
        <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 placeholder'>
          {formattedRank}
        </p>
      </div>

      <Image
        src={profileImage ?? DefaultProfileImage}
        alt={profileImage ? 'artwork image' : 'artwork default image'}
        className={profileImage ? 'object-contain' : ''}
        fill={true}
        sizes='346px'
        priority
      />

      {/* info */}
      <div className='absolute left-0 bottom-0 w-full pt-10 pb-[15px] px-[30px] bg-white'>
        {/* profile thumbnail */}
        <div className='absolute left-[30px] -top-[34px] w-[69px] h-[69px] rounded-full overflow-hidden'>
          <Image src={profileImage ?? DefaultProfileImage} alt='user-profile' />
        </div>
        {/* profile info */}
        <div className='flex flex-col gap-[10px]'>
          <div className='flex justify-between'>
            <p className='subtitle2 text-gray-900'>{nickname}</p>
            <FollowButton initFollowState={isFollow} followUserId={userId} />
          </div>
          <p className='placeholder text-gray-500'>{userField}</p>
          <p className='body2 text-gray-500'>{introduction}</p>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfileCard;
