'use client';

import FollowButton from '@/components/Button/FollowButton';
import OvalButton from '@/components/Button/OvalButton';
import ArtworkCard from '@/components/Card/ArtworkCard';
import DefaultCarousel from '@/components/Carousel/DefaultCarousel';
import FilterDropdown from '@/components/FilterDropdown';
import Icon from '@/components/Icon/Icon';
import Pagination from '@/components/Pagination';

import { useArtworkList } from '@/hooks/useArtworkList';
import { useFollowedArtists } from '@/hooks/useFollowedArtists';

import { ArtworkInfoType, FollowedArtist } from '@/types';

import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

interface ArtworkField {
  name: string;
  value: string;
}

const ArtworkList = () => {
  const [showFollowedArtistsCards, setShowFollowedArtistsCards] =
    useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [submittedKeyword, setSubmittedKeyword] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('최신순');
  const [selectedArtworkField, setSelectedArtworkField] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 12;
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

  const artworkFields = [
    { name: '전체', value: 'ALL' },
    { name: '회화', value: 'PAINTING' },
    { name: '공예/조각', value: 'CRAFTSCULPTURE' },
    { name: '드로잉', value: 'DRAWING' },
    { name: '판화', value: 'PRINTMAKING' },
    { name: '서예', value: 'CALLIGRAPHY' },
    { name: '일러스트', value: 'ILLUSTRATION' },
    { name: '디지털아트', value: 'DIGITALART' },
    { name: '사진', value: 'PHOTOGRAPHY' },
    { name: '기타', value: 'OTHERS' },
  ];

  const handleArtworkFieldClick = (artworkField: string) => {
    setSelectedArtworkField(artworkField);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchSubmit = () => {
    setSubmittedKeyword(searchKeyword.trim());
  };

  const {
    data: followedArtists,
    isLoading: followedArtistsLoading,
    error: followedArtistsError,
  } = useFollowedArtists();

  const {
    data: artworkList,
    isLoading: artworkListLoading,
    error: artworkListError,
  } = useArtworkList({
    sort: sortValue,
    artworkField:
      selectedArtworkField === 'ALL' ? undefined : selectedArtworkField,
    search: submittedKeyword,
    page: currentPage - 1,
    size: ITEMS_PER_PAGE,
  });

  if (!artworkList || followedArtistsLoading || artworkListLoading) {
    return <p className='px-[36px] lg:px-[140px]'>데이터 로딩 중...</p>;
  }

  if (followedArtistsError || artworkListError) {
    return <p className='px-[36px] lg:px-[140px]'>데이터 로드 중 오류 발생</p>;
  }

  const artworkListData = artworkList.data;
  const artworkListPage = artworkList.page;

  const handleFilterChange = (newFilter: string) => {
    setSelectedFilter(newFilter);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
                        className='w-[50px] h-[50px] bg-gray-700 rounded-full'
                      />
                      <div className='gap-[30px]'>
                        <p className='subtitle2 text-white'>
                          {artist.nickname}
                        </p>
                        <p className='placeholder text-gray-500'>
                          {artist.userField || '\u00A0'}
                        </p>
                      </div>
                    </div>
                    <FollowButton />
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

        <div className='flex items-center justify-center'>
          <div className='flex items-center w-[760px] h-[78px] px-5 rounded-[10px] bg-gray-900 mb-[110px] self-stretch'>
            <input
              className='flex-grow body1 bg-transparent border-none focus:outline-none placeholder-gray-500 focus:text-white'
              placeholder={`'작품 제목 또는 작가 이름'으로 검색`}
              value={searchKeyword}
              onChange={handleSearchChange}
            />
            <button onClick={handleSearchSubmit}>
              <Icon
                name='Search'
                size='l'
                className='text-white flex-shrink-0 ml-3'
              />
            </button>
          </div>
        </div>

        <div className='flex w-full justify-between items-end pb-[59px]'>
          <DefaultCarousel
            slides={artworkFields}
            renderSlide={(artworkField: ArtworkField) => (
              <OvalButton
                key={artworkField.value}
                variant={
                  selectedArtworkField === artworkField.value
                    ? 'primary'
                    : 'tertiaty'
                }
                buttonSize='m'
                onClick={() => handleArtworkFieldClick(artworkField.value)}
              >
                {artworkField.name}
              </OvalButton>
            )}
          />
        </div>

        <div className='max-w-[1920px] py-[73px] flex justify-between items-center self-stretch'>
          <h1>공예/조각</h1>
          <FilterDropdown
            options={filterOptions}
            selected={selectedFilter}
            onChange={handleFilterChange}
          />
        </div>

        <div className='w-full flex flex-wrap gap-[40_20px] justify-center items-center content-center'>
          {artworkListData.map((post: ArtworkInfoType) => (
            <ArtworkCard key={post.postId} artworkInfo={post} />
          ))}
        </div>

        {!artworkListData.length && (
          <div className='body1 flex w-full h-[511px] justify-center items-center text-gray-500 text-center'>
            선택하신 카테고리에 해당하는 작품이 아직 없어요.
          </div>
        )}

        {artworkListData.length > 0 && (
          <div className='py-[70px]'>
            <Pagination
              currentPage={artworkListPage.requestPage}
              totalPages={artworkListPage.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtworkList;
