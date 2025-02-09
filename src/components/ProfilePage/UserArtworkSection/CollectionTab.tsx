'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useStore } from 'zustand';

import UserArtworkCard from '@/components/Card/UserArtworkCard';
import FilterDropdown from '@/components/FilterDropdown';
import Icon from '@/components/Icon/Icon';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import CreateCollectionModal from '@/components/Modal/CreateCollectionModal';
import Pagination from '@/components/Pagination';
import { FILTER_OPTIONS, ITEMS_PER_PAGE } from '@/constants/pagination';
import ROUTE from '@/constants/routes';
import useDeleteArtworkPost from '@/hooks/serverStateHooks/useDeleteArtworkPost';
import useGetProfileCollectionList from '@/hooks/serverStateHooks/useGetProfileCollectionList';
import modalStore from '@/stores/modalStore';
import TokenHandler from '@/utils/tokenHandler';

const CollectionTab = () => {
  const [selectedFilter, setSelectedFilter] = useState('최신순');
  const { openModal, closeModal } = useStore(modalStore);
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = Number(searchParams.get('postId'));
  const userId = TokenHandler.getUserIdFromToken();
  const [currentPage, setCurrentPage] = useState(1);

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

  // NOTE: 컬렉션 조회 (GET) - getProfileCollectionList & useGetProfileCollectionList
  // NOTE: 컬렉션 카드 구현
  // TODO: 컬렉션 삭제 구현
  const { isMine, collections, pageInfo, isLoading } =
    useGetProfileCollectionList({
      sort: FILTER_OPTIONS[selectedFilter] || 'recent',
      page: currentPage - 1,
      size: ITEMS_PER_PAGE,
      userId,
    });

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='pt-[50px] md:px-[140px]'>
      {/* <UserArtworkSection /> */}
      <div className='flex justify-between items-center pb-[70px]'>
        <button className='button-m' onClick={handleCreateCollection}>
          <Icon name='Plus' size='m' className='mr-[10px]' />
          컬렉션 생성
        </button>
        <FilterDropdown
          options={Object.keys(FILTER_OPTIONS)}
          selected={selectedFilter}
          onChange={handleFilterChange}
          className='w-[155px]'
        />
      </div>
      <div>컬렉션 카드</div>
      <Icon name='Lock' size='l' className='text-white' />
      <Icon name='Unlock' size='l' className='text-white mt-[2.5px]' />

      <button onClick={clickDeleteButton}>삭제</button>

      <>
        <div className='w-full grid grid-cols-2 mobile:grid-cols-3 tablet:grid-cols-4  gap-x-[20px] gap-y-10'>
          {collections.map((collection) => (
            <UserArtworkCard
              key={collection.collectionId}
              collection={collection}
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

      {!collections.length && (
        <div className='body1 text-gray-500 py-[620px] text-center'>
          아직 컬렉션이 비어있어요.
        </div>
      )}
    </div>
  );
};

export default CollectionTab;
