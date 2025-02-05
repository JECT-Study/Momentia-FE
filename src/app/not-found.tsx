import Link from 'next/link';

import Icon from '@/components/Icon/Icon';
import ROUTE from '@/constants/routes';

const NotFound = () => {
  return (
    <div className='flex flex-col'>
      <div
        className='font-sans text-white w-full flex flex-col items-center md:items-start
        pt-[104px] md:pt-[312px] pb-[70px] md:pb-[151px] pl-6 md:pl-[190px] gap-[14px] md:leading-[90px]'
      >
        <h1 className='text-[64px] hidden md:block'>404</h1>
        <h1 className='text-[64px] hidden md:block'>Page Not Found</h1>
        <h3 className='block md:hidden'>404</h3>
        <h3 className='block md:hidden'>Page Not Found</h3>
      </div>
      <hr className='w-full h-[1px] bg-white border-none' />
      <Link
        href={ROUTE.home}
        className='flex items-center justify-center md:justify-end gap-5 pt-[70px] md:pt-[82px] md:pb-[223px] pr-6 md:pr-[190px] hover:underline'
      >
        <Icon
          name='ArrowRight'
          size='m'
          className='text-white block md:hidden'
        />
        <Icon
          name='ArrowRight'
          size='l'
          className='text-white hidden md:block'
        />
        <div className='subtitle2 md:subtitle1 text-gray-300'>
          메인 페이지로 돌아가기
        </div>
      </Link>
    </div>
  );
};

export default NotFound;
