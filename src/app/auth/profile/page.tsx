'use client';

import { useState } from 'react';

import FilterDropdown from '@/components/FilterDropdown';

import Icon from '../../../components/Icon/Icon';

const FILTER_OPTIONS = ['최신순', '가나다순'];

const Profile = () => {
  const [selectedFilter, setSelectedFilter] = useState('최신순');

  const handleFilterChange = (newFilter: string) => {
    setSelectedFilter(newFilter);
  };

  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  // };

  return (
    <div className='pt-[50px] md:px-[140px]'>
      <div className='flex justify-between items-center pb-[70px]'>
        <button className='button-m'>
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
      {/* <Pagination
        currentPage={artworkListPage.requestPage}
        totalPages={artworkListPage.totalPages}
        onPageChange={handlePageChange}
      /> */}
    </div>
  );
};

export default Profile;
