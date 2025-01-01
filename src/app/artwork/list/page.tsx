'use client';

import ArtworkFilter from '@/components/artwork/ArtworkFilter';
import ArtworkSearchBar from '@/components/artwork/ArtworkSearchBar';
import ArtworkShowcase from '@/components/artwork/ArtworkShowcase';
import FollowedArtistsSection from '@/components/artwork/FollowedArtistsSection';

import useArtworkList from '@/apis/artwork/getArtworkList';

import { useState } from 'react';

const ArtworkList = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [submittedKeyword, setSubmittedKeyword] = useState('');
  const [selectedArtworkField, setSelectedArtworkField] = useState('ALL');
  const [selectedFilter, setSelectedFilter] = useState('최신순');
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 12;
  const SORT_MAPPING: Record<string, string> = {
    최신순: 'recent',
    인기순: 'popular',
    조회순: 'view',
  };

  const sortValue = SORT_MAPPING[selectedFilter] || 'recent';

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

  if (!artworkList || artworkListLoading) {
    return <p className='px-[36px] lg:px-[140px]'>데이터 로딩 중...</p>;
  }

  if (artworkListError) {
    return <p className='px-[36px] lg:px-[140px]'>데이터 로드 중 오류 발생</p>;
  }

  const { data: artworkListData, page: artworkListPage } = artworkList;

  return (
    <div className='px-[36px] lg:px-[140px]'>
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
