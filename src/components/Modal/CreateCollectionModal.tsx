'use client';

import { ChangeEvent, useState } from 'react';
import { useStore } from 'zustand';

import usePostCollection from '@/hooks/serverStateHooks/usePostCollection';
import modalStore from '@/stores/modalStore';

import SquareButtonL from '../Button/SquareButtonL';
import Icon from '../Icon/Icon';
import BasicInput from '../Input/BasicInput';

const CreateCollectionModal = () => {
  const { closeModal } = useStore(modalStore);

  const [collectionName, setCollectionName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const { mutate: submitCreateCollection } = usePostCollection();

  const handleOnChangeCollectionName = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setCollectionName(event.target.value);
  };

  const clickCreateButton = () => {
    submitCreateCollection({ name: collectionName, isPrivate });
  };

  const clickSetPrivateCheck = () => {
    setIsPrivate((state) => !state);
  };

  return (
    <div className='flex flex-col tablet:px-[56px] px-[18px] py-[50px]'>
      <div className='flex justify-between items-center'>
        <h2 className='text-white'>컬렉션에 저장</h2>
        <Icon
          name='Close'
          size='l'
          className='text-gray-500'
          onClick={closeModal}
        />
      </div>
      <div className='grid grid-cols-[1fr_100px] mt-[100px] mb-[75px] gap-x-2.5'>
        <BasicInput
          value={collectionName}
          onChange={handleOnChangeCollectionName}
          label='컬렉션 이름'
          placeholder='컬렉션 이름을 입력하세요.'
          showTextLength={true}
          maxLength={10}
        />
        <span className='h-[60px] mt-[23px]'>
          <SquareButtonL
            variant={'primary'}
            onClick={clickCreateButton}
            disabled={collectionName.length === 0}
          >
            생성
          </SquareButtonL>
        </span>
        <button
          className='flex items-center gap-2.5'
          onClick={clickSetPrivateCheck}
        >
          <Icon
            name='CheckCircleFilled'
            size='s'
            className={isPrivate ? 'text-main' : 'text-gray-700'}
          />
          <p className='placeholder text-white'>비공개로 설정</p>
        </button>
      </div>
    </div>
  );
};

export default CreateCollectionModal;
