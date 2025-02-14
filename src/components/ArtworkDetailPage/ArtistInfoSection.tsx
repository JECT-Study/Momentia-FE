import Image from 'next/image';
import Link from 'next/link';

import ROUTE from '@/constants/routes';
import { ArtworkPostArtistInfoType } from '@/types';

import FollowButton from '../Button/FollowButton';

interface ArtistInfoSectionProps {
  artistInfo: ArtworkPostArtistInfoType;
}

const ArtistInfoSection = ({
  artistInfo: {
    userId,
    profileImage,
    nickname,
    userField,
    isFollow,
    introduction,
    isMine,
  },
}: ArtistInfoSectionProps) => {
  return (
    <div className='tablet:w-[470px] flex flex-col gap-[20px]'>
      <h2>작가 정보</h2>
      <div className='tablet:px-[60px] px-[10px] py-9 rounded-[10px] bg-gray-900'>
        <Link
          href={ROUTE.profile(userId)}
          className='group flex gap-[42px] justify-center items-center'
        >
          <Image
            src={profileImage || '/images/defaultProfileImage.png'}
            alt='profile-image'
            className='object-cover rounded-full aspect-square'
            width={141}
            height={141}
          />
          <div className='flex flex-col flex-1 gap-[22px] subtitle2'>
            <p className='group-hover:underline'>{nickname}</p>
            <p>{userField}</p>
          </div>
        </Link>
        <p className='subtitle2 mt-[30px] mb-[40px]'>
          {introduction || '작가 소개가 비어있습니다.'}
        </p>
        {!isMine && (
          <FollowButton
            initFollowState={isFollow}
            followUserId={userId}
            isFull={true}
          />
        )}
      </div>
    </div>
  );
};

export default ArtistInfoSection;
