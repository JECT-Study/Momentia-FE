import Link from 'next/link';

import ROUTE from '@/constants/routes';
import { ArtworkPostHeaderInfoType } from '@/types';
import timeFormatter from '@/utils/timeFormatter';

import Icon from '../Icon/Icon';
import UserThumbnail from '../UserThumbnail';

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
    userId,
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
      <Link
        href={ROUTE.profile(userId)}
        className='flex items-center gap-[22px] hover:underline subtitle2'
      >
        <UserThumbnail profileImage={profileImage} />
        <p>{nickname}</p>
      </Link>
      <div className='flex tablet:flex-row flex-col tablet:gap-[22px] justify-end tablet:items-center items-end subtitle2'>
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
