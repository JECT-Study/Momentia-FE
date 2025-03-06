'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import ROUTE from '@/constants/routes';
import { ArtistInfoType } from '@/types/artist';

import FollowButton from '../Button/FollowButton';
import UserThumbnail from '../UserThumbnail';

interface ArtistProfileCardProps {
  rank: number;
  artistInfo: ArtistInfoType;
}

const ArtistProfileCard = ({ rank, artistInfo }: ArtistProfileCardProps) => {
  const router = useRouter();

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

  const clickArtistName = () => {
    router.push(ROUTE.profile(userId));
  };

  return (
    <div className='relative w-[346px] h-[330px] rounded-[10px] overflow-hidden'>
      <div className='absolute left-[30px] top-0 z-10 w-[33px] h-[48px]'>
        <Image
          src='/images/rankingLabel.png'
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
        src={artworkImage ?? '/images/defaultArtworkImage.png'}
        alt={profileImage ? 'artwork image' : 'artwork default image'}
        className={profileImage ? 'object-contain' : ''}
        fill={true}
        sizes='346px'
        priority
      />

      <div className='absolute left-0 bottom-0 w-full pt-10 pb-[15px] px-[30px] bg-white'>
        <UserThumbnail
          profileImage={profileImage}
          className='absolute left-[30px] -top-[34px] aspect-square'
        />
        <div className='flex flex-col gap-[10px]'>
          <div className='flex justify-between'>
            <p
              className='subtitle2 text-gray-900 cursor-pointer hover:underline'
              onClick={clickArtistName}
            >
              dfsdfsd
              {nickname}
            </p>
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
