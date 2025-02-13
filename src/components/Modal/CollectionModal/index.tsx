'use client';

import '@/styles/scroll.css';

import { useStore } from 'zustand';

import Icon from '@/components/Icon/Icon';
import useGetAllCollectionList from '@/hooks/serverStateHooks/useGetAllCollectionList';
import modalStore from '@/stores/modalStore';

import CollectionUnit from './CollectionUnit';
import CreateCollectionUnit from './CreateCollectionUnit';

const CollectionModal = () => {
  const { closeModal } = useStore(modalStore);
  const { collections, isLoading } = useGetAllCollectionList();

  if (isLoading) return <div>Loading</div>;

  return (
    <div className='flex flex-col gap-[50px] tablet:pl-[56px] tablet:pr-[22px] px-[18px] py-[50px]'>
      <div className='flex justify-between items-center tablet:pr-[34px]'>
        <h2 className='text-white'>컬렉션에 저장</h2>
        <Icon
          name='Close'
          size='l'
          className='text-gray-500'
          onClick={closeModal}
        />
      </div>
      <div className='grid tablet:grid-cols-4 grid-cols-1 gap-x-[33px] gap-y-[30px] max-h-[555px] tablet:pr-[34px] overflow-y-auto scroll-hide'>
        <CreateCollectionUnit />
        {collections.map((collection) => (
          <CollectionUnit
            key={collection.collectionId}
            collectionInfo={collection}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionModal;
