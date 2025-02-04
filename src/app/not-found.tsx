import Link from 'next/link';

import Icon from '@/components/Icon/Icon';

const NotFound = () => {
  return (
    <div className='flex flex-col'>
      <div
        className='font-sans text-white w-full flex flex-col items-start
        pt-[312px] pb-[151px] pl-6 tablet:pl-[190px] gap-[14px] leading-[90px]'
      >
        <h1 className='text-[64px]'>404</h1>
        <h1 className='text-[64px]'>Page Not Found</h1>
      </div>
      <hr className='w-full h-[1px] bg-white border-none' />
      <Link
        href='/'
        className='flex items-center justify-end gap-5 pt-[82px] pb-[223px] pr-6 tablet:pr-[190px] hover:underline'
      >
        <Icon name='ArrowRight' size='l' className='text-white' />
        <div className='subtitle1 text-gray-300'>메인 페이지로 돌아가기</div>
      </Link>
    </div>
  );
};

export default NotFound;
