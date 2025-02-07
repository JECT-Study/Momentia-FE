'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import OvalButton from '@/components/Button/OvalButton';
import UserArtworkCard from '@/components/Card/UserArtworkCard';
import FilterDropdown from '@/components/FilterDropdown';
import Pagination from '@/components/Pagination';
import { ITEMS_PER_PAGE, SORT_MAPPING } from '@/constants/pagination';
import ROUTE from '@/constants/routes';
import { SORT_OPTIONS } from '@/constants/sortOptions';
import useGetUserArtworkList from '@/hooks/serverStateHooks/useGetUserArtworkList';

const ArtworkTab = () => {
  const router = useRouter();
  const params = useSearchParams();
  const userIdParams = params.get('userId');
  const userId = userIdParams ? Number(userIdParams) : 0;

  const [currentSort, setCurrentSort] = useState('최신순');
  const [currentPage, setCurrentPage] = useState(1);

  const { isMine, artworkList, pageInfo } = useGetUserArtworkList({
    sort: SORT_MAPPING[currentSort] || 'recent',
    page: currentPage - 1,
    size: ITEMS_PER_PAGE,
    userId,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (sort: string) => {
    setCurrentSort(sort);
  };

  const clickUploadButton = () => {
    router.push(ROUTE.artworkUpload);
  };

  return (
    <div className='flex flex-col items-end'>
      <FilterDropdown
        options={SORT_OPTIONS}
        selected={currentSort}
        onChange={handleFilterChange}
        className='w-[149px]'
      />

      {artworkList.length > 0 ? (
        <>
          <div className='w-full grid grid-cols-2 mobile:grid-cols-3 tablet:grid-cols-4  gap-x-[20px] gap-y-10'>
            {artworkList.map((artwork) => (
              <UserArtworkCard
                key={artwork.postId}
                artworkInfo={artwork}
                isMine={isMine}
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
            아직 업로드된 작품이 없네요.
            <br />
            작품을 업로드 하고, 다른 유저들과 공유해보세요!
          </p>
          <OvalButton
            buttonSize='s'
            variant='primary'
            onClick={clickUploadButton}
          >
            작품 업로드하러 가기
          </OvalButton>
        </div>
      )}
    </div>
  );
};

export default ArtworkTab;
