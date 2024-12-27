'use client';

import FollowButton from '@/components/Button/FollowButton';
import ArtworkCard from '@/components/Card/ArtworkCard';
import Icon from '@/components/Icon/Icon';

import { useState } from 'react';

const ArtworkList = () => {
  const [showArtworkCards, setShowArtworkCards] = useState(false);

  const artworkData = [
    {
      artworkInfo: {
        postId: 1,
        userId: 13,
        title: '아름다운 풍경',
        postImage: '/images/defaultArtworkImage.png',
        nickname: '작가1',
        viewCount: 123,
        likeCount: 45,
        commentCount: 10,
        isLiked: true,
      },
    },
    {
      artworkInfo: {
        postId: 2,
        userId: 13,
        title: '추상적인 예술',
        postImage: '/images/defaultArtworkImage.png',
        nickname: '작가2',
        viewCount: 89,
        likeCount: 23,
        commentCount: 5,
        isLiked: false,
      },
    },
  ];

  return (
    <div className='px-[36px] lg:px-[140px]'>
      <div className='pt-[70px]'>
        <button
          className='flex items-center pb-[56px] w-[202px] justify-between'
          onClick={() => setShowArtworkCards(!showArtworkCards)}
        >
          <h3 className='text-white'>내가 팔로우한 작가</h3>
          <Icon
            name={showArtworkCards ? 'Dropup' : 'Dropdown'}
            size='s'
            className='text-gray-700'
          />
        </button>

        {showArtworkCards && (
          <div className='pr-[31px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]'>
            <div className='bg-gray-900 rounded-[10px] border border-gray-800 p-[20px] w-[458px] h-[403px] flex flex-col justify-center items-start gap-[30px]'>
              <div className='flex items-center justify-between w-full'>
                <div className='flex gap-[30px]'>
                  <img
                    src='/images/defaultProfileImage.png'
                    alt='Artwork'
                    className='w-[50px] h-[50px] bg-gray-700 rounded-full'
                  />
                  <div className='gap-[30px]'>
                    <p className='subtitle2 text-white'>작가 닉네임</p>
                    <p className='placeholder text-gray-500'>작업 분야</p>
                  </div>
                </div>
                <FollowButton />
              </div>
              <div
                className='w-full h-[267px] flex 
              justify-end items-center gap-3.5 justify-self-stretch rounded-[10px]'
              >
                {artworkData.map(({ artworkInfo }) => (
                  <ArtworkCard
                    key={artworkInfo.postId}
                    mode='followed-author'
                    artworkInfo={artworkInfo}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtworkList;
