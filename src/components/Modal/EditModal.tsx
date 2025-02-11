'use client';

import { useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import { useStore } from 'zustand';

import SquareButtonL from '@/components/Button/SquareButtonL';
import Icon from '@/components/Icon/Icon';
import BasicInput from '@/components/Input/BasicInput';
import { COLLECTION } from '@/constants/API';
import usePatchCollection from '@/hooks/serverStateHooks/usePatchCollection';
import modalStore from '@/stores/modalStore';

interface EditModalProps {
  title: string;
  collectionId: number;
}

const EditModal = ({ title, collectionId }: EditModalProps) => {
  const [collectionTitle, setCollectionTitle] = useState(title);
  const { closeModal } = useStore(modalStore);

  const queryClient = useQueryClient();
  const { mutate: patchCollectionStatus } = usePatchCollection();

  const MAX_TITLE_LENGTH = 10;

  const handleCollectionTitleOnChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setCollectionTitle(event.target.value);
  };

  const clickEditButton = () => {
    patchCollectionStatus(
      {
        collectionId,
        data: {
          name: collectionTitle,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [COLLECTION.collectionList],
          });
          closeModal();
        },
      },
    );
  };

  const isDisabled = title === collectionTitle || collectionTitle.trim() === '';

  return (
    <div className='flex flex-col tablet:px-[56px] px-[18px] py-[50px]'>
      <div className='flex justify-between items-center'>
        <h2 className='text-gray-100'>컬렉션 이름 수정</h2>
        <Icon
          name='Close'
          size='l'
          className='text-gray-500'
          onClick={closeModal}
        />
      </div>

      <div className='items-center grid grid-cols-[1fr_100px] mt-[100px] mb-[75px] gap-2.5'>
        <BasicInput
          type='text'
          label={title}
          placeholder='컬렉션 이름'
          value={collectionTitle}
          onChange={handleCollectionTitleOnChange}
          showTextLength={true}
          maxLength={MAX_TITLE_LENGTH}
        />

        <span className='h-[60px] mb-1.5'>
          <SquareButtonL
            variant='tertiary'
            children='완료'
            onClick={clickEditButton}
            disabled={isDisabled}
          />
        </span>
      </div>
    </div>
  );
};

export default EditModal;
