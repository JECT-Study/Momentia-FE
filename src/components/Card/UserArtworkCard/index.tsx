'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import DefaultImage from '@/../public/images/defaultArtworkImage.png';
import Icon from '@/components/Icon/Icon';
import ROUTE from '@/constants/routes';
import { UserArtworkInfoType } from '@/types/user';

import CardController from './CardController';

interface UserArtworkCardProps {
  artworkInfo: UserArtworkInfoType;
  isMine?: boolean;
}

const UserArtworkCard = ({
  artworkInfo,
  isMine = false,
}: UserArtworkCardProps) => {
  const router = useRouter();
  const {
    postId,
    title,
    postImage,
    viewCount,
    likeCount,
    commentCount,
    isLiked,
    status,
  } = artworkInfo;

  const [showOption, setShowOption] = useState(false);

  const clickArtwork = () => {
    router.push(`${ROUTE.artworkDetail}?postId=${postId}`);
  };

  return (
    <div
      className='relative overflow-hidden group rounded-[5px] w-full min-h-[224px] mobile:min-h-[511px] cursor-pointer'
      onClick={clickArtwork}
    >
      <Image
        src={postImage || DefaultImage}
        alt={postImage ? `artwork-${postId}` : 'default_image'}
        fill={true}
        className={postImage ? 'object-contain' : 'object-cover'}
        priority
      />

      <div
        className={`absolute top-0 left-0 flex flex-col ${status && isMine ? 'justify-between' : 'justify-end'}
          w-full h-full px-[15px] py-[19px] mobile:px-[32px] mobile:py-[23px]
          text-white bg-gradient-to-b from-[#00000000] to-[#000000]
          ${showOption || 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300 z-5`}
      >
        {status && isMine && (
          <div className='flex justify-between'>
            <Icon name={status === 'PRIVATE' ? 'Lock' : 'Unlock'} />
            <CardController
              postId={postId}
              currentStatus={status}
              showOption={showOption}
              setShowOption={setShowOption}
            />
          </div>
        )}
        <div className='flex flex-col gap-[35px]'>
          <p className='subtitle1'>{title}</p>

          <div className='button-s flex gap-5 items-center'>
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
    </div>
  );
};

export default UserArtworkCard;
