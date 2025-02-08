'use client';

import { useState } from 'react';

import ArtworkFilter from '@/components/ArtworkListPage/ArtworkFilter';
import ArtworkSearchBar from '@/components/ArtworkListPage/ArtworkSearchBar';
import ArtworkShowcase from '@/components/ArtworkListPage/ArtworkShowcase';
import FollowedArtistsSection from '@/components/ArtworkListPage/FollowedArtistsSection';
import { ITEMS_PER_PAGE, SORT_MAPPING } from '@/constants/pagination';
import useGetArtworkList from '@/hooks/serverStateHooks/useGetArtworkList';

const ArtworkList = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [submittedKeyword, setSubmittedKeyword] = useState('');
  const [selectedArtworkField, setSelectedArtworkField] = useState('ALL');
  const [selectedFilter, setSelectedFilter] = useState('최신순');
  const [currentPage, setCurrentPage] = useState(1);

  const sortValue = SORT_MAPPING[selectedFilter] || 'recent';

  const {
    data: artworkList,
    isLoading: artworkListLoading,
    error: artworkListError,
  } = useGetArtworkList({
    sort: sortValue,
    artworkField:
      selectedArtworkField === 'ALL' ? undefined : selectedArtworkField,
    search: submittedKeyword,
    page: currentPage - 1,
    size: ITEMS_PER_PAGE,
  });

  if (!artworkList || artworkListLoading) {
    return <p className='px-[36px] lg:px-[140px]'>데이터 로딩 중...</p>;
  }

  if (artworkListError) {
    return <p className='px-[36px] lg:px-[140px]'>데이터 로드 중 오류 발생</p>;
  }

  const { data: artworkListData, page: artworkListPage } = artworkList;

  return (
    <div className='max-w-[1920px] w-full m-auto px-[36px] lg:px-[140px]'>
      <div className='pt-[70px]'>
        <FollowedArtistsSection />
        <ArtworkSearchBar
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          setSubmittedKeyword={setSubmittedKeyword}
        />
        <ArtworkFilter
          selectedArtworkField={selectedArtworkField}
          setSelectedArtworkField={setSelectedArtworkField}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          setCurrentPage={setCurrentPage}
        />
        <ArtworkShowcase
          artworkListData={artworkListData}
          artworkListPage={artworkListPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ArtworkList;
