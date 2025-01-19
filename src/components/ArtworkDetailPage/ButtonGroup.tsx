'use client';

import { useEffect, useState } from 'react';
import { useStore } from 'zustand';

import Icon from '@/components/Icon/Icon';
import CollectionModal from '@/components/Modal/CollectionModal';
import useToggleLike from '@/hooks/serverStateHooks/useToggleLike';
import modalStore from '@/stores/modalStore';
import { ArtworkPostSocialInfoType } from '@/types';

import ShareModal from '../Modal/ShareModal';

interface ButtonGroupProps {
  socialInfo: ArtworkPostSocialInfoType;
}

const ButtonGroup = ({
  socialInfo: {
    postId,
    nickname,
    title,
    likeCount: initialLikeCount,
    isLiked: initialIsLiked,
  },
}: ButtonGroupProps) => {
  const { openModal } = useStore(modalStore);
  const [blockButton, setBlockButton] = useState(false);

  const {
    mutate: toggleLike,
    setLikeStatus,
    isLiked,
    likeCount,
  } = useToggleLike({
    isLiked: initialIsLiked,
    likeCount: initialLikeCount,
  });

  const openCollectionModal = () => {
    openModal({
      modalSize: 'lg',
      contents: <CollectionModal />,
    });
  };

  const openShareModal = () => {
    openModal({
      modalSize: 'md',
      contents: <ShareModal nickname={nickname} title={title} />,
    });
  };

  const handleClickLikeToggle = () => {
    setBlockButton(true);
    toggleLike(postId);
    setBlockButton(false);
  };

  useEffect(() => {
    setLikeStatus({
      isLiked: initialIsLiked,
      likeCount: initialLikeCount,
    });
  }, [initialLikeCount, initialIsLiked]);

  return (
    <div className='tablet:absolute top-0 left-full tablet:w-[77px] w-content tablet:h-full tablet:ml-[30px] button-s text-center'>
      <div className='sticky flex tablet:flex-col gap-[40px] top-[100px]'>
        <div className='flex flex-col items-center gap-[10px]'>
          <button
            className='flex flex-col justify-center items-center tablet:gap-[3px] tablet:w-full w-[57px] rounded-full bg-gray-800 aspect-square active:bg-[#3E3B43]'
            onClick={handleClickLikeToggle}
            disabled={blockButton}
          >
            <Icon
              name={isLiked ? 'HeartFilled' : 'Heart'}
              size='l'
              className={isLiked ? 'text-[#FF4548]' : 'text-white'}
            />
            <p>{likeCount}</p>
          </button>
          <p>좋아요</p>
        </div>
        <div className='flex flex-col items-center gap-[10px]'>
          <button
            className='flex flex-col justify-center items-center tablet:gap-[3px] tablet:w-full w-[57px] rounded-full bg-gray-800 aspect-square active:bg-[#3E3B43]'
            onClick={openShareModal}
          >
            <Icon name='AlternateShare' size='l' />
          </button>
          <p>공유하기</p>
        </div>
        <div className='flex flex-col items-center gap-[10px]'>
          <button
            className='flex flex-col justify-center items-center tablet:gap-[3px] tablet:w-full w-[57px] rounded-full bg-gray-800 aspect-square active:bg-[#3E3B43]'
            onClick={openCollectionModal}
          >
            <Icon name='Bookmark' size='l' />
          </button>
          <p>저장하기</p>
        </div>
      </div>
    </div>
  );
};

export default ButtonGroup;
