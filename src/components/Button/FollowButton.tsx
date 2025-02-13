'use client';

import { useState } from 'react';

import useToggleFollow from '@/hooks/serverStateHooks/useToggleFollow';
import { FollowButtonProps } from '@/types/buttons/FollowButtonProps';

import Icon from '../Icon/Icon';

const FollowButton = ({
  initFollowState,
  followUserId,
  ariaLabel,
  isFull = false,
}: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(initFollowState);
  const { mutate: toggleFollow } = useToggleFollow({
    isFollowing,
    setIsFollowing,
  });

  const handleFollowClick = () => toggleFollow(followUserId);

  return (
    <button
      onClick={handleFollowClick}
      aria-label={ariaLabel}
      className={`
        button-s flex items-center justify-center rounded-full
        ${isFull ? 'w-full' : 'w-fit'} px-4 h-[37px] gap-[3px] ml-auto
        ${
          isFollowing
            ? 'border	border-gray-900 text-gray-900 bg-white'
            : 'bg-gray-800 text-white'
        }
        hover:bg-opacity-80 active:bg-opacity-60 active:scale-95
        transition-all duration-300 ease-in-out
      `}
    >
      {isFollowing ? (
        <>
          <Icon name='Check' size='s' />
          <span>팔로잉</span>
        </>
      ) : (
        <>
          <Icon name='Plus' size='s' />
          <span>팔로우</span>
        </>
      )}
    </button>
  );
};

export default FollowButton;
