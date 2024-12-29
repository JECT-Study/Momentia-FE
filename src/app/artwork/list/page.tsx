'use client';

import FollowButton from '@/components/Button/FollowButton';
import ArtworkCard from '@/components/Card/ArtworkCard';
import Icon from '@/components/Icon/Icon';

import { useArtworkList } from '@/hooks/useArtworkList';
import { useFollowedArtists } from '@/hooks/useFollowedArtists';

import { useState } from 'react';

const ArtworkList = () => {
  const [showFollowedArtistsCards, setShowFollowedArtistsCards] =
    useState(true);

  const {
    data: followedArtists,
    isLoading: followedArtistsLoading,
    error: followedArtistsError,
  } = useFollowedArtists();

  const {
    data: artworkList,
    isLoading: artworkListLoading,
    error: artworkListError,
  } = useArtworkList();

  if (followedArtistsLoading) {
    return <p>팔로우한 작가 데이터 로딩 중...</p>;
  }

  if (artworkListLoading) {
    return <p>작품 목록 데이터 로딩 중...</p>;
  }

  if (followedArtistsError) {
    return <p>팔로우한 작가 데이터를 가져오는 중, 에러 발생</p>;
  }

  if (artworkListError) {
    return <p>작품 목록 데이터를 가져오는 중에 에러 발생</p>;
  }

  const followedArtistsData = followedArtists.posts;
  const artworkListData = artworkList.data;

  return (
    <div className='px-[36px] lg:px-[140px]'>
      <div className='pt-[70px]'>
        <button
          className='flex items-center pb-[56px] w-[202px] justify-between'
          onClick={() => setShowFollowedArtistsCards(!showFollowedArtistsCards)}
        >
          <h3 className='text-white'>내가 팔로우한 작가</h3>
          <Icon
            name={showFollowedArtistsCards ? 'Dropup' : 'Dropdown'}
            size='s'
            className='text-gray-700'
          />
        </button>

        {showFollowedArtistsCards && (
          <div className='pr-[31px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]'>
            {followedArtistsData.map((artist: any) => (
              <div
                key={artist.userId}
                className='bg-gray-900 rounded-[10px] border border-gray-800 p-[20px] w-[458px] h-[403px]
                flex flex-col justify-center items-start gap-[30px]'
              >
                <div className='flex items-center justify-between w-full'>
                  <div className='flex gap-[30px]'>
                    <img
                      src={
                        artist.userImage || '/images/defaultProfileImage.png'
                      }
                      alt={artist.nickname}
                      className='w-[50px] h-[50px] bg-gray-700 rounded-full'
                    />
                    <div className='gap-[30px]'>
                      <p className='subtitle2 text-white'>{artist.nickname}</p>
                      <p className='placeholder text-gray-500'>
                        {artist.userField || ''}
                      </p>
                    </div>
                  </div>
                  <FollowButton />
                </div>
                <div className='w-full h-[267px] flex flex-wrap gap-3.5 justify-self-stretch rounded-[10px]'>
                  {artist.posts.map((post: any) => (
                    <ArtworkCard
                      key={post.postId}
                      artworkInfo={post}
                      mode='followed-author'
                    />
                  ))}
                </div>
              </div>
            ))}

            {!followedArtistsData.length && (
              <div
                className='grid flex-col col-span-full items-center justify-center
                  h-[403px] bg-gray-900 border border-gray-800 rounded-[10px]'
              >
                <div className='subtitle2 text-gray-500 text-center'>
                  아직 팔로우한 작가가 없네요! 내 취향에 맞는 작가를 발견하면,
                  팔로우해 보세요!
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtworkList;