'use client';

import { useState } from 'react';
import { useStore } from 'zustand';

import FilterDropdown from '@/components/FilterDropdown';
import CollectionUnit from '@/components/Modal/CollectionModal/CollectionUnit';
import CreateCollectionModal from '@/components/Modal/CreateCollectionModal';
import useGetAllCollectionList from '@/hooks/serverStateHooks/useGetCollectionList';
import modalStore from '@/stores/modalStore';

import Icon from '../../../components/Icon/Icon';

const FILTER_OPTIONS = ['최신순', '가나다순'];

const Profile = () => {
  const [selectedFilter, setSelectedFilter] = useState('최신순');
  const { openModal, closeModal } = useStore(modalStore);

  const handleFilterChange = (newFilter: string) => {
    setSelectedFilter(newFilter);
  };

  const handleCreateCollecion = () => {
    closeModal();

    openModal({
      modalSize: 'md',
      contents: <CreateCollectionModal />,
    });
  };

  const { collections } = useGetAllCollectionList();

  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  // };

  return (
    <div className='pt-[50px] md:px-[140px]'>
      <div className='flex justify-between items-center pb-[70px]'>
        <button className='button-m' onClick={handleCreateCollecion}>
          <Icon name='Plus' size='m' className='mr-[10px]' />
          컬렉션 생성
        </button>
        <FilterDropdown
          options={FILTER_OPTIONS}
          selected={selectedFilter}
          onChange={handleFilterChange}
          className='w-[155px]'
        />
      </div>
      <div>컬렉션 카드</div>
      <Icon name='Lock' size='l' className='text-white' />
      <Icon name='Unlock' size='l' className='text-white mt-[2.5px]' />

      <div className='grid tablet:grid-cols-4 grid-cols-1 gap-x-[33px] gap-y-[30px] max-h-[555px] tablet:pr-[34px] overflow-y-auto scroll-hide'>
        {collections.map((collection) => (
          <CollectionUnit
            key={collection.collectionId}
            collectionInfo={collection}
          />
        ))}
      </div>

      {/* <Pagination
        currentPage={artworkListPage.requestPage}
        totalPages={artworkListPage.totalPages}
        onPageChange={handlePageChange}
      /> */}
    </div>
  );
};

export default Profile;
