import { useRouter } from 'next/navigation';
import { useState } from 'react';

import ROUTE from '@/constants/routes';
import useClickOutside from '@/hooks/useClickOutside';
import TokenHandler from '@/utils/tokenHandler';

const NavbarUserOption = () => {
  const router = useRouter();
  const [toggleOptionArea, setToggleOptionArea] = useState(false);

  const targetRef = useClickOutside<HTMLDivElement>(() => {
    setToggleOptionArea(false);
  });

  const clickSignOut = () => {
    TokenHandler.removeToken();
    router.push(ROUTE.signIn);
    setToggleOptionArea(false);
  };

  return (
    <div className='relative flex align-center' ref={targetRef}>
      <button
        type='button'
        className='rounded-full bg-white w-8 h-8 flex-shrink-0'
        onClick={() => setToggleOptionArea((prev) => !prev)}
      />
      {toggleOptionArea && (
        <div className='absolute -left-[201px] top-[50px] w-[327px] h-[342px] bg-gray-800 text-white rounded-md'>
          <div className='absolute top-[-8px] left-2/3 transform -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[15px] border-b-gray-800' />
          <div className='flex flex-col h-full subtitle1'>
            <div className='flex gap-10 mb-[26px] p-[30px] items-center'>
              <div className='rounded-full bg-white w-[71px] h-[71px] flex-shrink-0' />
              <div className='button-m'>닉네임</div>
            </div>
            <button className='flex-1 flex items-center px-[40px] py-[30px] hover:bg-gray-900'>
              내 프로필
            </button>
            <button
              className='flex-1 flex items-center px-[40px] py-[30px] hover:bg-gray-900'
              onClick={clickSignOut}
            >
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarUserOption;
