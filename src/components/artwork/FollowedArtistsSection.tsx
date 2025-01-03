'use Client';

import DefaultCarousel from '@/components/Carousel/DefaultCarousel';

import { ArtworkInfoType, FollowedArtist } from '@/types';

import Image from 'next/image';
import { useState } from 'react';

import useFollowedArtists from '@/apis/artwork/getFollowedArtists';

import FollowButton from '../Button/FollowButton';
import ArtworkCard from '../Card/ArtworkCard';
import Icon from '../Icon/Icon';

const FollowedArtistsSection = () => {
  const [showFollowedArtistsCards, setShowFollowedArtistsCards] =
    useState(true);

  const {
    data: followedArtists,
    isLoading: followedArtistsLoading,
    error: followedArtistsError,
  } = useFollowedArtists();

  if (!followedArtists || followedArtistsLoading) {
    return <p className='px-[36px] lg:px-[140px]'>데이터 로딩 중...</p>;
  }

  if (followedArtistsError) {
    return <p className='px-[36px] lg:px-[140px]'>데이터 로드 중 오류 발생</p>;
  }

  return (
    <>
      <button
        className='flex items-center pb-[56px] w-[202px] justify-between'
        onClick={() => setShowFollowedArtistsCards((prev) => !prev)}
      >
        <h3 className='text-white'>내가 팔로우한 작가</h3>
        <Icon
          name={showFollowedArtistsCards ? 'Dropup' : 'Dropdown'}
          size='s'
          className='text-gray-700'
        />
      </button>

      {showFollowedArtistsCards && (
        <div className='pb-[130px]'>
          <DefaultCarousel
            slides={followedArtists}
            spaceSize='s'
            renderSlide={(artist: FollowedArtist) => (
              <div
                key={artist.userId}
                className='bg-gray-900 rounded-[10px] border border-gray-800 p-[20px] w-[458px] h-[403px]
          flex flex-col justify-start items-start gap-[30px] self-stretch'
              >
                <div className='flex items-center justify-between w-full'>
                  <div className='flex gap-[30px]'>
                    <Image
                      src={
                        artist.userImage || '/images/defaultProfileImage.png'
                      }
                      alt={artist.nickname}
                      width={100}
                      height={100}
                      priority
                      className='w-[50px] h-[50px] bg-gray-700 rounded-full'
                    />
                    <div className='gap-[30px]'>
                      <p className='subtitle2 text-white'>{artist.nickname}</p>
                      <p className='placeholder text-gray-500'>
                        {artist.userField || '\u00A0'}
                      </p>
                    </div>
                  </div>
                  <FollowButton
                    initFollowState={artist.isFollow}
                    followUserId={artist.userId}
                  />
                </div>
                <div className='w-full h-[267px] flex flex-wrap gap-3.5 justify-self-stretch rounded-[10px]'>
                  {artist.posts.map((post: ArtworkInfoType) => (
                    <ArtworkCard
                      key={post.postId}
                      artworkInfo={post}
                      mode='followed-artists'
                    />
                  ))}
                </div>
              </div>
            )}
          />

          {!followedArtists.length && (
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
    </>
  );
};

export default FollowedArtistsSection;
