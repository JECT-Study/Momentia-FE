'use client';

import { useEffect } from 'react';
import { useStore } from 'zustand';

import modalStore from '@/stores/modalStore';

const ModalPage = () => {
  const { isOpen, modalSize, contents } = useStore(modalStore);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';

    return () => {
      if (isOpen) document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const modalClassNames: Record<string, string> = {
    xs: 'tablet:w-[366px] rounded-[10px]',
    sm: 'tablet:w-[500px] rounded-[10px]',
    md: 'tablet:w-[827px] rounded-[20px]',
    lg: 'tablet:w-[1011px] rounded-[20px]',
  };

  return (
    <>
      {isOpen && (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50'>
          <div
            className={`${modalClassNames[modalSize]} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[366px] h-content bg-background-overlay text-black`}
          >
            {contents}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalPage;
