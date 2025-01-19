'use client';

import { ChangeEvent, useState } from 'react';
import { useStore } from 'zustand';

import SquareButtonL from '@/components/Button/SquareButtonL';
import Icon from '@/components/Icon/Icon';
import BasicInput from '@/components/Input/BasicInput';
import modalStore from '@/stores/modalStore';
import copyClipboard from '@/utils/copyClipboard';

const ShareModal = () => {
  const { closeModal } = useStore(modalStore);
  const [shareURL, setShareURL] = useState(window.location.href);
  const [copyStatus, setCopyStatus] = useState(false);

  const handlOnChangeShareURL = (event: ChangeEvent<HTMLInputElement>) => {
    setShareURL(event.target.value);
  };

  const clickCopyButton = async () => {
    const copyResult = await copyClipboard(shareURL);
    setCopyStatus(copyResult);
  };

  return (
    <div className='flex flex-col tablet:px-[56px] px-[18px] py-[50px]'>
      <div className='flex justify-between items-center'>
        <h2 className='text-white'>작품 공유</h2>
        <Icon
          name='Close'
          size='l'
          className='text-gray-500'
          onClick={closeModal}
        />
      </div>
      <div className='flex gap-5 items-center body1 mt-5'>
        <p className='text-gray-200'>작품 이름</p>
        <p className='text-gray-300'>작가 닉네임</p>
      </div>
      <div className='grid grid-cols-[1fr_100px] mt-[100px] mb-[75px] gap-2.5'>
        <BasicInput
          type='text'
          value={shareURL}
          onChange={handlOnChangeShareURL}
        />
        <span className='h-[60px]'>
          <SquareButtonL
            variant={'tertiary'}
            children={copyStatus ? '복사 완료' : 'URL 복사'}
            onClick={clickCopyButton}
          />
        </span>
      </div>
    </div>
  );
};

export default ShareModal;
