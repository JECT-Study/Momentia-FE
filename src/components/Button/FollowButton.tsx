'use client';

import { useState } from 'react';

import Icon from '../Icon/Icon';

interface FollowButtonProps {
  onClick?: () => void;
  ariaLabel?: string;
}

const FollowButton = ({ onClick, ariaLabel }: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = async () => {
    setIsLoading(true);

    const previousState = isFollowing;
    setIsFollowing((prev) => !prev);

    try {
      if (previousState) {
        await deleteFollow(followUserId);
      } else {
        await postFollow(followUserId);
      }
    } catch (error) {
      setIsFollowing(previousState);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFollow}
      aria-label={ariaLabel}
      className={`
        button-s flex items-center justify-center rounded-full
        w-[95px] h-[37px] gap-[3px] ml-auto
        bg-gray-800 text-white
        ${
          isFollowing
            ? 'border	border-gray-900 text-gray-900 bg-white'
            : 'bg-gray-800 text-white'
        }
        hover:bg-opacity-80 active:bg-opacity-60 active:scale-95
        transition-all duration-300 ease-in-out
      `}
      disabled={isLoading}
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
