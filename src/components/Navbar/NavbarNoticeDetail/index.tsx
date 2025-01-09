'use client';

import { useState } from 'react';

import Icon from '@/components/Icon/Icon';
import useClickOutside from '@/hooks/useClickOutside';

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
          <div className='tablet:block hidden tablet:absolute top-[-8px] left-2/3 transform -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[15px] border-b-gray-800' />
          <div className='flex flex-col gap-[28px] w-full h-full py-[28px] bg-gray-800 rounded-md overflow-hidden'>
            <NoticeHeader noticeCount={4} closeAction={closeNotice} />
            <NoticeContent />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarNoticeDetail;
