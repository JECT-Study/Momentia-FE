'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useStore } from 'zustand';

import ConfirmModal from '@/components/Modal/ConfirmModal';
import CreateCollectionModal from '@/components/Modal/CreateCollectionModal';
import CollectionTab from '@/components/ProfilePage/UserArtworkSection/CollectionTab';
import ROUTE from '@/constants/routes';
import useDeleteArtworkPost from '@/hooks/serverStateHooks/useDeleteArtworkPost';
import useGetAllCollectionList from '@/hooks/serverStateHooks/useGetCollectionList';
import modalStore from '@/stores/modalStore';

const FILTER_OPTIONS = ['최신순', '가나다순'];

// TODO: 작품 삭제 API 및 로직 사용

const Collection = () => {
  const [selectedFilter, setSelectedFilter] = useState('최신순');
  const { openModal, closeModal } = useStore(modalStore);
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = Number(searchParams.get('postId'));

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

  // TODO: 컬렉션 삭제 구현
  // TODO: 작품 삭제 API 및 로직 분리 (컬렉션 페이지에서 사용 예정)
  // TODO: 컬렉션 불러오기 (GET)
  const { collections } = useGetAllCollectionList();
  const { mutate: deleteArtwork } = useDeleteArtworkPost();

  const confirmDelete = () => {
    deleteArtwork(postId, {
      onSuccess: () => {
        router.replace(ROUTE.artworkList);
        closeModal();
      },
    });
  };

  const clickDeleteButton = () => {
    openModal({
      modalSize: 'sm',
      contents: (
        <ConfirmModal
          onClickConfirmButton={confirmDelete}
          onClickOtherButton={closeModal}
          isButtonOnRow={false}
          reverseButtonOrder={true}
        >
          <p>
            작품을 삭제하시겠습니까?
            <br />
            삭제한 작품은 복구할 수 없습니다.
          </p>
        </ConfirmModal>
      ),
    });
  };

  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  // };

  return (
    <div>
      {/* <div className='flex justify-between items-center pb-[70px]'>
        <button className='button-m' onClick={handleCreateCollection}>
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

      <button onClick={clickDeleteButton}>작품 삭제</button> */}

      {/* <Pagination
        currentPage={artworkListPage.requestPage}
        totalPages={artworkListPage.totalPages}
        onPageChange={handlePageChange}
      /> */}

      <CollectionTab />
    </div>
  );
};

export default Collection;
