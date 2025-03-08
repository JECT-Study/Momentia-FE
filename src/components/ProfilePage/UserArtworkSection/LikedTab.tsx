'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import OvalButton from '@/components/Button/OvalButton';
import ArtworkAndCollectionCard from '@/components/Card/ArtworkAndCollectionCard';
import Pagination from '@/components/Pagination';
import SortDropdown from '@/components/SortDropdown';
import { ITEMS_PER_PAGE } from '@/constants/pagination';
import ROUTE from '@/constants/routes';
import { ARTWORK_SORT_OPTIONS, SORT_OPTIONS } from '@/constants/sortOptions';
import useGetLikedArtworkList from '@/hooks/server/useGetLikedArtworkList';
import useToastStore from '@/stores/useToastStore';

const LikedTab = () => {
  const [currentSort, setCurrentSort] = useState('최신순');
  const [currentPage, setCurrentPage] = useState(1);

  const { showToast } = useToastStore();

  const router = useRouter();

  const { artworkList, pageInfo, isError } = useGetLikedArtworkList({
    sort: ARTWORK_SORT_OPTIONS[currentSort] || 'recent',
    page: currentPage - 1,
    size: ITEMS_PER_PAGE,
  });

  if (isError) showToast('error', '좋아요한 작품 목록 조회에 실패하였습니다.');

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (sort: string) => {
    setCurrentSort(sort);
  };

  const goToArtworkList = () => {
    router.push(ROUTE.artworkList);
  };

  return (
    <div className='flex-1 flex flex-col items-end'>
      <SortDropdown
        options={SORT_OPTIONS}
        selected={currentSort}
        onChange={handleSortChange}
        className='w-[149px]'
      />
      {artworkList.length > 0 ? (
        <>
          <div className='w-full grid grid-cols-2 mobile:grid-cols-3 tablet:grid-cols-4 gap-x-[20px] gap-y-10'>
            {artworkList.map((artwork) => (
              <ArtworkAndCollectionCard
                key={artwork.postId}
                artworkInfo={{ ...artwork, status: null }}
              />
            ))}
          </div>

          <div className='m-auto w-fit pt-[70px]'>
            <Pagination
              currentPage={pageInfo.requestPage}
              totalPages={pageInfo.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <div className='flex-1 flex flex-col justify-center items-center gap-[30px] m-auto pt-[608px] pb-[527px]'>
          <p className='body-1 text-gray-500 text-center'>
            아직 좋아요를 누른 작품이 없어요.
            <br />
            마음에 드는 작품에 좋아요를 눌러보세요!
          </p>
          <OvalButton
            buttonSize='s'
            variant='primary'
            onClick={goToArtworkList}
          >
            작품 구경하러 가기
          </OvalButton>
        </div>
      )}
    </div>
  );
};

export default LikedTab;
