import Image from 'next/image';

import DefaultProfileImage from '@/../public/images/defaultProfileImage.png';
import { ArtworkPostHeaderInfoType } from '@/types';
import timeFormatter from '@/utils/timeFormatter';

import Icon from '../Icon/Icon';

interface ArtworkDetailHeaderProps {
  headerInfo: ArtworkPostHeaderInfoType;
}

const ArtworkDetailHeader = ({
  headerInfo: {
    title,
    artworkField,
    viewCount,
    profileImage,
    nickname,
    createdTime,
  },
}: ArtworkDetailHeaderProps) => {
  return (
    <div>
      <div className='flex gap-[50px] items-center mb-[40px]'>
        <h1>{title}</h1>
        <p className='subtitle1 border-l-1 pl-[50px] border-white'>
          {artworkField}
        </p>
      </div>
      <div className='flex items-center gap-[22px]'>
        <Image
          src={profileImage || DefaultProfileImage}
          alt={profileImage ? 'artwork image' : 'artwork default image'}
          className='object-contain rounded-full'
          width={67}
          height={67}
        />
        <p>{nickname}</p>
      </div>
      <div className='flex tablet:flex-row flex-col tablet:gap-[22px] justify-end tablet:items-center items-end'>
        <div className='flex gap-[13px] justify-end items-center'>
          <Icon name='Eye' size='s' />
          <p>{viewCount}</p>
        </div>
        <p>{timeFormatter(createdTime)}</p>
      </div>
    </div>
  );
};

export default ArtworkDetailHeader;
