'use client';

import Icon from '@/components/Icon/Icon';

interface NoticHeaderProps {
  noticeCount: number;
  closeAction: () => void;
}

const NoticeHeader = ({ noticeCount, closeAction }: NoticHeaderProps) => {
  return (
    <div className='flex w-full items-center gap-[21px] px-[30px] small-chip '>
      <div className='flex-1 flex justify-between items-center'>
        <p className=''>읽지 않은 알림 ({noticeCount})</p>
        <div className='flex items-center gap-[21px]'>
          <button className='text-gray-500' type='button'>
            모두 읽기
          </button>
          <Icon name='Settings' size='m' className='text-white' />
        </div>
      </div>
      <button
        className='block tablet:hidden'
        type='button'
        onClick={closeAction}
      >
        <Icon name='Close' size='m' className='text-white' />
      </button>
    </div>
  );
};

export default NoticeHeader;
