'use client';

import { useState } from 'react';
import { useStore } from 'zustand';

import ArtworkAndCollectionCard from '@/components/Card/ArtworkAndCollectionCard';
import Icon from '@/components/Icon/Icon';
import CreateCollectionModal from '@/components/Modal/CreateCollectionModal';
import Pagination from '@/components/Pagination';
import SortDropdown from '@/components/SortDropdown';
import { ARTWORK_SORT_OPTIONS, ITEMS_PER_PAGE } from '@/constants/pagination';
import useGetProfileCollectionList from '@/hooks/serverStateHooks/useGetProfileCollectionList';
import modalStore from '@/stores/modalStore';
import TokenHandler from '@/utils/tokenHandler';

const CollectionTab = () => {
  const [selectedFilter, setSelectedFilter] = useState('최신순');
  const [currentPage, setCurrentPage] = useState(1);
  const { openModal, closeModal } = useStore(modalStore);

  const userId = TokenHandler.getUserIdFromToken();

  const handleFilterChange = (newFilter: string) => {
    setSelectedFilter(newFilter);
  };

  const handleCreateCollection = () => {
    closeModal();
    openModal({
      modalSize: 'md',
      contents: <CreateCollectionModal />,
    });
  };

  const { isMine, collections, pageInfo, isLoading } =
    useGetProfileCollectionList({
      sort: ARTWORK_SORT_OPTIONS[selectedFilter] || 'recent',
      page: currentPage - 1,
      size: ITEMS_PER_PAGE,
      userId,
    });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='pt-[50px]'>
      <div className='flex justify-between items-center'>
        <button className='button-m' onClick={handleCreateCollection}>
          <Icon name='Plus' size='m' className='mr-[10px]' />
          컬렉션 생성
        </button>
        <SortDropdown
          options={Object.keys(ARTWORK_SORT_OPTIONS)}
          selected={selectedFilter}
          onChange={handleFilterChange}
          className='w-[155px]'
        />
      </div>

      {isLoading && <div className='body1'>로딩 중...</div>}

      {collections.length > 0 && (
        <>
          <div className='w-full grid grid-cols-2 mobile:grid-cols-3 tablet:grid-cols-4 gap-x-[20px] gap-y-10 pt-[70px]'>
            {collections.map((collection) => (
              <ArtworkAndCollectionCard
                key={collection.collectionId}
                collection={collection}
                isMine={isMine}
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

      {collections.length === 0 && (
        <div className='py-[70px]'>
          <div className='body1 text-gray-500 py-[185px] md:py-[620px] text-center'>
            아직 컬렉션이 비어있어요.
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionTab;
