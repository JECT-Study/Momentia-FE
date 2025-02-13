'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Icon from '@/components/Icon/Icon';
import ROUTE from '@/constants/routes';
import { CollectionType } from '@/types/collection';
import { UserArtworkInfoType } from '@/types/user';

import CardController from './CardController';

interface ArtworkAndCollectionCardProps {
  isMine?: boolean;
  isCollectionPage?: boolean;
  artworkInfo?: UserArtworkInfoType;
  collection?: CollectionType;
}

const ArtworkAndCollectionCard = ({
  isMine = false,
  isCollectionPage = false,
  artworkInfo,
  collection,
}: ArtworkAndCollectionCardProps) => {
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
  } = artworkInfo ?? {};

  const { collectionId, collectionImage, name, collectionStatus } =
    collection ?? {};

  const [showOption, setShowOption] = useState(false);

  const clickArtwork = () => {
    if (postId) {
      router.push(`${ROUTE.artworkDetail}?postId=${postId}`);
    }

    if (collectionId) {
      router.push(`${ROUTE.collection}?collectionId=${collectionId}`);
    }
  };

  return (
    <div
      className='relative overflow-hidden group rounded-[5px] w-full aspect-[4/5] cursor-pointer'
      onClick={clickArtwork}
    >
      {artworkInfo && (
        <Image
          src={postImage || '/images/defaultArtworkImage.png'}
          alt={postImage ? `artwork-${postId}` : 'default_image'}
          fill={true}
          className={postImage ? 'object-contain' : 'object-cover'}
          priority
        />
      )}

      {collection && (
        <Image
          src={collectionImage || '/images/defaultArtworkImage.png'}
          alt={collectionImage ? `collection-${collectionId}` : 'default_image'}
          fill={true}
          className={collectionImage ? 'object-contain' : 'object-cover'}
          priority
        />
      )}

      <div
        className={`absolute top-0 left-0 flex flex-col ${(collectionStatus && isMine) || (status && isMine) ? 'justify-between' : 'justify-end'}
          w-full h-full px-[15px] py-[19px] mobile:px-[32px] mobile:py-[23px]
          text-white bg-gradient-to-b from-[#00000000] to-[#000000]
          ${showOption || 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300 z-5`}
      >
        {status && isMine && (
          <div className='flex justify-between'>
            <Icon
              name={status === 'PRIVATE' ? 'Lock' : 'Unlock'}
              size='s'
              className='text-white block md:hidden'
            />
            <Icon
              name={status === 'PRIVATE' ? 'Lock' : 'Unlock'}
              size='l'
              className='text-white hidden md:block'
            />
            <CardController
              postId={postId}
              collectionId={collectionId}
              currentStatus={status}
              showOption={showOption}
              setShowOption={setShowOption}
              isCollectionPage={isCollectionPage}
            />
          </div>
        )}

        {collectionStatus && isMine && (
          <div className='flex justify-between'>
            <Icon
              name={collectionStatus === 'PRIVATE' ? 'Lock' : 'Unlock'}
              size='s'
              className='text-white block md:hidden'
            />
            <Icon
              name={collectionStatus === 'PRIVATE' ? 'Lock' : 'Unlock'}
              size='l'
              className='text-white hidden md:block'
            />
            <CardController
              postId={postId}
              collectionId={collectionId}
              currentStatus={collectionStatus}
              showOption={showOption}
              setShowOption={setShowOption}
            />
          </div>
        )}

        <div className='flex flex-col gap-[35px]'>
          {artworkInfo && <p className='button-s md:subtitle1'>{title}</p>}
          {collection && <p className='button-s md:subtitle2'>{name}</p>}

          {artworkInfo && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtworkAndCollectionCard;
