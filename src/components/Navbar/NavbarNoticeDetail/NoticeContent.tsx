'use client';

import NoticeUnit from './NoticeUnit';

const NoticeContent = () => {
  return (
    <div className='flex-1 w-ful overflow-y-scroll'>
      <NoticeUnit />
      <NoticeUnit />
      <NoticeUnit />
      <NoticeUnit />
    </div>
  );
};

export default NoticeContent;
