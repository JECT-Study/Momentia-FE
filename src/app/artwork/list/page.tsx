'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import ArtworkFilter from '@/components/ArtworkListPage/ArtworkFilter';
import ArtworkSearchBar from '@/components/ArtworkListPage/ArtworkSearchBar';
import ArtworkShowcase from '@/components/ArtworkListPage/ArtworkShowcase';
import FollowedArtistsSection from '@/components/ArtworkListPage/FollowedArtistsSection';
import { ITEMS_PER_PAGE } from '@/constants/pagination';
import { ARTWORK_SORT_OPTIONS } from '@/constants/sortOptions';
import useGetArtworkList from '@/hooks/server/useGetArtworkList';
import useToastStore from '@/stores/useToastStore';

const ArtworkList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedArtworkField = searchParams.get('category') || 'ALL';

  const [searchKeyword, setSearchKeyword] = useState('');
  const [submittedKeyword, setSubmittedKeyword] = useState('');
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [currentPage, setCurrentPage] = useState(1);

  const { showToast } = useToastStore();

  const sortValue = ARTWORK_SORT_OPTIONS[selectedOption] || 'recent';

  const {
    data: artworkList,
    isLoading: artworkListLoading,
    isError: artworkListError,
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
    showToast('error', '작품 목록 조회에 실패하였습니다.');
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
          router={router}
          searchParams={searchParams}
          selectedArtworkField={selectedArtworkField}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
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
