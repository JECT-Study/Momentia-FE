'use client';

import { useState } from 'react';

import { FollowButtonProps } from '@/types/buttons/FollowButtonProps';

import Icon from '../Icon/Icon';

const FollowButton = ({
  backgroundColor = 'bg-gray-900',
  textColor = 'text-white',
  textSize = 'button-s',

  onClick,
  ariaLabel,
}: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = () => {
    setIsFollowing((prev) => !prev);

    // 외부에서 전달받은 onClick 함수 실행
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={toggleFollow}
      aria-label={ariaLabel}
      className={`
        flex items-center justify-center rounded-full
        w-[95px] h-[37px] gap-[3px]
        ${backgroundColor} ${textColor} ${textSize}
        ${
          isFollowing
            ? 'border	border-gray-900 text-gray-900 bg-white'
            : 'bg-gray-900 text-white'
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
