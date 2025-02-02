import Image from 'next/image';

import DefaultProfileImage from '@/../public/images/defaultProfileImage.png';
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
  },
}: ArtistInfoSectionProps) => {
  return (
    <div className='tablet:w-[470px] flex flex-col gap-[20px]'>
      <h2>작가 정보</h2>
      <div className='tablet:px-[60px] px-[10px] py-9 rounded-[10px] bg-gray-900'>
        <div className='flex gap-[42px] justify-center items-center'>
          <Image
            src={profileImage || DefaultProfileImage}
            alt='profile-image'
            className='object-contain rounded-full'
            width={141}
            height={141}
          />
          <div className='flex flex-col flex-1 gap-[22px] subtitle2'>
            <p>{nickname}</p>
            <p>{userField}</p>
          </div>
        </div>
        <p className='subtitle2 mt-[30px] mb-[40px]'>
          {introduction || '작가 소개가 비어있습니다.'}
        </p>
        <FollowButton
          initFollowState={isFollow}
          followUserId={userId}
          isFull={true}
        />
      </div>
    </div>
  );
};

export default ArtistInfoSection;
