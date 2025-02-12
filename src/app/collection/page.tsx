'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useStore } from 'zustand';

import ArtworkAndCollectionCard from '@/components/Card/ArtworkAndCollectionCard';
import RenameCollectionModal from '@/components/CollectionPage/RenameCollectionModal';
import Icon from '@/components/Icon/Icon';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import ShareModal from '@/components/Modal/ShareModal';
import Pagination from '@/components/Pagination';
import SortDropdown from '@/components/SortDropdown';
import { COLLECTION } from '@/constants/API';
import { ARTWORK_SORT_OPTIONS, ITEMS_PER_PAGE } from '@/constants/pagination';
import useDeleteCollection from '@/hooks/serverStateHooks/useDeleteCollection';
import useGetCollectionArtworks from '@/hooks/serverStateHooks/useGetCollectionArtworks';
import modalStore from '@/stores/modalStore';

const Collection = () => {
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [currentPage, setCurrentPage] = useState(1);
  const { openModal, closeModal } = useStore(modalStore);

  const collectionIdParams = useSearchParams().get('collectionId');
  const collectionId = collectionIdParams ? Number(collectionIdParams) : 0;
  const handleSortChange = (newOption: string) => {
    setSelectedOption(newOption);
  };

  const queryClient = useQueryClient();
  const {
    isMine,
    name: collectionName,
    artworks,
    pageInfo,
    isLoading,
  } = useGetCollectionArtworks({
    sort: ARTWORK_SORT_OPTIONS[selectedOption] || 'recent',
    page: currentPage - 1,
    size: ITEMS_PER_PAGE,
    collectionId,
  });

  const artworksLength = artworks.length;

  const openShareModal = () => {
    openModal({
      modalSize: 'md',
      contents: (
        <ShareModal title={collectionName} artworksLength={artworksLength} />
      ),
    });
  };

  const openRenameCollectionModal = () => {
    openModal({
      modalSize: 'md',
      contents: (
        <RenameCollectionModal
          title={collectionName}
          collectionId={collectionId}
        />
      ),
    });
  };

  const { mutate: deleteCollection } = useDeleteCollection();

  const confirmCollectionDelete = () => {
    deleteCollection(collectionId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [COLLECTION.collectionList],
        });
        closeModal();
      },
    });
  };

  const clickCollectionDeleteButton = () => {
    openModal({
      modalSize: 'sm',
      contents: (
        <ConfirmModal
          onClickConfirmButton={confirmCollectionDelete}
          onClickOtherButton={closeModal}
          isButtonOnRow={false}
          reverseButtonOrder={true}
        >
          <p>
            컬렉션을 삭제하시겠습니까?
            <br />
            삭제한 컬렉션은 복구할 수 없습니다.
          </p>
        </ConfirmModal>
      ),
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='pt-[50px] px-[32px] md:px-[140px]'>
      <div className='flex justify-start'>
        <button
          className='button-m flex items-center mb-[20px]'
          onClick={openRenameCollectionModal}
          disabled={!isMine}
        >
          <h1 className='hidden md:block'>{collectionName}</h1>
          <h3 className='block md:hidden'>{collectionName}</h3>
          {isMine && (
            <Icon
              name='EditPencil'
              size='m'
              className='ml-[20px] text-gray-500'
            />
          )}
        </button>
      </div>

      <div className='flex justify-between items-center'>
        <h3 className='hidden md:block'>{artworksLength}개의 작품</h3>
        <h4 className='block md:hidden'>{artworksLength}개의 작품</h4>
        <div className='flex gap-[30px]'>
          <button onClick={openShareModal}>
            <Icon name='UploadShare' size='m' className='text-white' />
          </button>
          {isMine && (
            <button onClick={clickCollectionDeleteButton}>
              <Icon name='Trash' size='m' className='text-white' />
            </button>
          )}
        </div>
      </div>

      <div className='flex justify-end pt-[70px]'>
        <SortDropdown
          options={Object.keys(ARTWORK_SORT_OPTIONS)}
          selected={selectedOption}
          onChange={handleSortChange}
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
                isCollectionPage={true}
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
