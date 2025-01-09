'use client';

const NoticeUnit = () => {
  // TODO: 백그라운드 작업 필요

  const readNoticeClassName = false
    ? ['bg-notice-base', 'text-white', 'text-gray-300']
    : ['bg-notice-selected', 'text-gray-500', 'text-[#616161]'];

  return (
    <div
      className={`${readNoticeClassName[0]} flex gap-5 w-full px-[30px] py-[26.5px] border border-gray-800`}
    >
      <div className='w-20 h-20 rounded-[4px] bg-gray-300' />
      <div className='flex flex-col gap-4 button-s'>
        <div>
          <p
            className={`${readNoticeClassName[1]} w-[270px] text-ellipsis overflow-hidden whitespace-nowrap`}
          >
            안녕하세요 님이 내 작품에 댓글을 달았습니다.zzzzzzzzzzzzz
          </p>
          <p className={`${readNoticeClassName[2]}`}>작품이름</p>
        </div>
        <p className='text-gray-500'>1시간 전</p>
      </div>
    </div>
  );
};

export default NoticeUnit;
