'use client';

const NoticeUnit = () => {
  // TODO: 백그라운드 작업 필요

  const readNoticeClassName = false
    ? 'bg-gray-800'
    : 'bg-gray-900 text-gray-500';

  return (
    <div
      className={`${readNoticeClassName} flex gap-5 w-full px-[30px] py-[26.5px] border border-gray-800`}
    >
      <div className='w-20 h-20 rounded-[4px] bg-gray-300' />
      <div className='flex flex-col gap-4 buton-s'>
        <div>
          <p className='w-full text-ellipsis overflow-hidden'>
            안녕하세요 님이 내 작품에 댓글을 달았습니다.
          </p>
          <p>작품이름</p>
        </div>
        <p className='text-gray-500'>1시간 전</p>
      </div>
    </div>
  );
};

export default NoticeUnit;
