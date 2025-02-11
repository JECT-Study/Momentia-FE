'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useStore } from 'zustand';

import ArtworkAndCollectionCard from '@/components/Card/ArtworkAndCollectionCard';
import Icon from '@/components/Icon/Icon';
import Pagination from '@/components/Pagination';
import SortDropdown from '@/components/SortDropdown';
import { ARTWORK_SORT_OPTIONS, ITEMS_PER_PAGE } from '@/constants/pagination';
import useGetCollectionArtworks from '@/hooks/serverStateHooks/useGetCollectionArtworks';
import modalStore from '@/stores/modalStore';

const Collection = () => {
  const [selectedFilter, setSelectedFilter] = useState('최신순');
  const [currentPage, setCurrentPage] = useState(1);
  const { openModal, closeModal } = useStore(modalStore);

  const collectionIdParams = useSearchParams().get('collectionId');
  const collectionId = collectionIdParams ? Number(collectionIdParams) : 0;
  const handleFilterChange = (newFilter: string) => {
    setSelectedFilter(newFilter);
  };

  const { isMine, artworks, pageInfo, isLoading } = useGetCollectionArtworks({
    sort: ARTWORK_SORT_OPTIONS[selectedFilter] || 'recent',
    page: currentPage - 1,
    size: ITEMS_PER_PAGE,
    collectionId,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='pt-[50px] px-[32px] md:px-[140px]'>
      <div className='flex justify-start'>
        <button className='button-m flex items-center mb-[20px]'>
          <h1 className='hidden md:block'>컬렉션 이름</h1>
          <h3 className='block md:hidden'>컬렉션 이름</h3>
          <Icon
            name='EditPencil'
            size='m'
            className='ml-[20px] text-gray-500'
          />
        </button>
      </div>

      <div className='flex justify-between items-center'>
        <h3 className='hidden md:block'>0개의 작품</h3>
        <h4 className='block md:hidden'>0개의 작품</h4>
        <div className='flex gap-[30px]'>
          <button>
            <Icon name='UploadShare' size='m' className='text-white' />
          </button>
          <button>
            <Icon name='Trash' size='m' className='text-white' />
          </button>
        </div>
      </div>

      <div className='flex justify-end pt-[70px]'>
        <SortDropdown
          options={Object.keys(ARTWORK_SORT_OPTIONS)}
          selected={selectedFilter}
          onChange={handleFilterChange}
          className='w-[155px]'
        />
      </div>

      {isLoading && <div className='body1'>로딩 중...</div>}

      {artworks.length > 0 && (
        <>
          <div className='w-full grid grid-cols-2 mobile:grid-cols-3 tablet:grid-cols-4 gap-x-[20px] gap-y-10 pt-[70px]'>
            {artworks.map((artwork) => (
              <ArtworkAndCollectionCard
                key={artwork.postId}
                isMine={isMine}
                artworkInfo={artwork}
              />
            ))}
          </div>

          <div className='m-auto w-fit py-[70px]'>
            <Pagination
              currentPage={pageInfo.requestPage}
              totalPages={pageInfo.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}

      {artworks.length === 0 && (
        <div className='py-[70px]'>
          <div className='body1 text-gray-500 py-[185px] md:py-[620px] text-center'>
            아직 작품이 없어요.
          </div>
        </div>
      )}
    </div>
  );
};

export default Collection;
