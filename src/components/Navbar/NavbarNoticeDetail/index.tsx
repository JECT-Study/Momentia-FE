'use client';

import { useState } from 'react';

import Icon from '@/components/Icon/Icon';
import useClickOutside from '@/hooks/clientStateHooks/useClickOutside';

import NoticeContent from './NoticeContent';
import NoticeHeader from './NoticeHeader';

const NavbarNoticeDetail = () => {
  const [toggleDetailArea, setToggleDetailArea] = useState(false);

  const closeNotice = () => {
    setToggleDetailArea(false);
  };

  const targetRef = useClickOutside<HTMLDivElement>(closeNotice);

  return (
    <div className='flex item-center relative z-20' ref={targetRef}>
      <button
        type='button'
        onClick={() => {
          setToggleDetailArea((prev) => !prev);
        }}
      >
        <Icon name='Notification' size='l' className='text-white' />
      </button>
      {toggleDetailArea && (
        <div className='fixed tablet:absolute tablet:-left-[275px] tablet:top-[50px] left-0 top-0 tablet:w-[436px] tablet:h-[550px] w-full h-full text-white'>
          <div className='tablet:block hidden tablet:absolute top-[-8px] left-2/3 transform -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[15px] border-b-background-overlay' />
          <div className='flex flex-col gap-[28px] w-full h-full pt-[28px] bg-background-overlay rounded-2xl overflow-hidden'>
            <NoticeHeader noticeCount={4} closeAction={closeNotice} />
            <NoticeContent />
          </div>
          <div className='absolute right-0 bottom-0 w-full h-[68px] bg-gradient-to-b from-background-base/0 to-background-base' />
        </div>
      )}
    </div>
  );
};

export default NavbarNoticeDetail;
