'use client';

import { useStore } from 'zustand';

import Icon from '@/components/Icon/Icon';
import modalStore from '@/stores/modalStore';

import CreateCollectionModal from '../CreateCollectionModal';

const CreateCollectionUnit = () => {
  const { openModal, closeModal } = useStore(modalStore);

  const handleCreateCollection = () => {
    closeModal();

    openModal({
      modalSize: 'md',
      contents: <CreateCollectionModal />,
    });
  };

  return (
    <button
      className='flex tablet:flex-col items-center gap-[8px] tablet:p-0 p-[9px]'
      onClick={handleCreateCollection}
    >
      <div
        className='flex justify-center items-center tablet:w-full tablet:h-[200px] w-[70px] h-[70px] rounded-[5px] overflow-hidden'
        style={{
          border: '2px dashed transparent',
          borderImage:
            'repeating-linear-gradient(45deg, gray 0, gray 10px, transparent 10px, transparent 20px) 1',
        }}
      >
        <Icon name='Plus' size='l' className='text-gray-500' />
      </div>
      <p className='subtitle2 text-white'>컬렉션 생성</p>
    </button>
  );
};

export default CreateCollectionUnit;
