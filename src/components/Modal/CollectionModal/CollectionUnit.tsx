'use client';

import Image from 'next/image';
import { useState } from 'react';

import DefaultImage from '@/../public/images/defaultArtworkImage.png';
import Icon from '@/components/Icon/Icon';
import usePostCollectionAddArtwork from '@/hooks/serverStateHooks/usePostCollectionAddArtwork';
import { CollectionType } from '@/types/collection';

const CollectionUnit = ({
  collectionInfo,
}: {
  collectionInfo: CollectionType;
}) => {
  const { collectionId, collectionImage, name, status } = collectionInfo;
  const [blockButton, setBlockButton] = useState(false);

  const { mutate: addCollectionArtwork } = usePostCollectionAddArtwork({
    collectionId,
  });

  const selectCollectionUnit = () => {
    setBlockButton(true);
    addCollectionArtwork();
    setBlockButton(false);
  };

  return (
    <button
      className='flex tablet:flex-col items-center gap-[8px] tablet:p-0 p-[9px]'
      onClick={selectCollectionUnit}
      disabled={blockButton}
    >
      <div className='relative tablet:w-full tablet:h-[200px] w-[70px] h-[70px] rounded-[5px] overflow-hidden'>
        <Image
          src={collectionImage || DefaultImage}
          alt={collectionImage ? 'collection-image' : 'default-image'}
          fill={true}
        />
      </div>
      <div className='flex flex-1 tablet:flex-col justify-between items-center tablet:gap-[3px] gap-[19px]'>
        <p className='subtitle2 text-white'>{name}</p>
        <div className='flex items-center gap-0.5 body2 text-gray-500'>
          <Icon name={status === 'PRIVATE' ? 'Lock' : 'Unlock'} size='s' />
          <p>{status === 'PRIVATE' ? '비공개' : '전체 공개'}</p>
        </div>
      </div>
    </button>
  );
};

export default CollectionUnit;
