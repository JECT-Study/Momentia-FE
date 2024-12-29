'use client';

import FollowButton from '@/components/Button/FollowButton';
import ArtworkCard from '@/components/Card/ArtworkCard';
import FilterDropdown from '@/components/FilterDropdown';
import Icon from '@/components/Icon/Icon';
import Pagination from '@/components/Pagination';

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

  const [selectedFilter, setSelectedFilter] = useState('최신순');
  const filterOptions = ['최신순', '인기순', '조회순'];

  const getSortValue = (filter: string) => {
    switch (filter) {
      case '최신순':
        return 'recent';
      case '인기순':
        return 'popular';
      case '조회순':
        return 'view';
      default:
        return 'recent';
    }
  };

  const sortValue = getSortValue(selectedFilter);

  const {
    data: artworkList,
    isLoading: artworkListLoading,
    error: artworkListError,
  } = useArtworkList(sortValue);

  if (followedArtistsLoading || artworkListLoading) {
    return <p className='px-[36px] lg:px-[140px]'>데이터 로딩 중...</p>;
  }

  if (followedArtistsError || artworkListError) {
    return <p className='px-[36px] lg:px-[140px]'>데이터 로드 중 오류 발생</p>;
  }

  const artworkListData = artworkList?.artwork;
  const artworkListPage = artworkList?.page;

  const handleFilterChange = (newFilter: string) => {
    setSelectedFilter(newFilter);
  };

  const handlePageChange = (page: number) => {
    window.location.href = `/artwork/posts?page=${page}`;
  };

  return (
    <div className='px-[36px] lg:px-[140px]'>
      <div className='pt-[70px]'>
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
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] pb-[130px]'>
            {followedArtists.map((artist: any) => (
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
                      mode='followed-artists'
                    />
                  ))}
                </div>
              </div>
            ))}

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

        <div className='flex items-center justify-center'>
          <div className='flex items-center w-[760px] h-[78px] px-5 rounded-[10px] bg-gray-900 mb-[110px]'>
            <input
              className='flex-grow body1 bg-transparent border-none focus:outline-none placeholder-gray-500 focus:text-white'
              placeholder={`'작품 제목 또는 작가 이름'으로 검색`}
            />
            <Icon
              name='Search'
              size='l'
              className='text-white flex-shrink-0 ml-3'
            />
          </div>
        </div>

        <div className='max-w-[1920px] py-[73px] flex justify-between items-center self-stretch'>
          <h1>공예/조각</h1>
          <FilterDropdown
            options={filterOptions}
            selected={selectedFilter}
            onChange={handleFilterChange}
          />
        </div>

        <div className='w-full flex flex-wrap gap-[40_20px]'>
          {artworkListData.map((post: any) => (
            <ArtworkCard key={post.postId} artworkInfo={post} />
          ))}
        </div>

        <Pagination
          currentPage={artworkListPage.requestPage}
          totalPages={artworkListPage.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ArtworkList;
