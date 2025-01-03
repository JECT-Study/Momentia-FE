'use client';

import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import deleteFollow from '@/apis/follow/deleteFollow';
import postFollow from '@/apis/follow/postFollow';

import { FollowButtonProps } from '@/types/buttons/FollowButtonProps';

import { ARTWORK } from '@/constants/API';

import Icon from '../Icon/Icon';

const FollowButton = ({
  initFollowState,
  followUserId,
  ariaLabel,
}: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(initFollowState);

  const queryClient = useQueryClient();

  const { mutate: toggleFollow } = useMutation<void, Error, number>({
    mutationFn: async (userId: number) => {
      isFollowing === true
        ? await deleteFollow(userId)
        : await postFollow(userId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ARTWORK.followedArtists],
      });
      setIsFollowing((prev) => !prev);
    },

    onError: (error) => {
      console.error(error.message);
    },
  });

  const handleFollowClick = () => toggleFollow(followUserId);

  return (
    <button
      onClick={handleFollowClick}
      aria-label={ariaLabel}
      className={`
        button-s flex items-center justify-center rounded-full
        w-[95px] h-[37px] gap-[3px] ml-auto
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
