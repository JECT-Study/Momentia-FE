import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import ROUTE from '@/constants/routes';
import useClickOutside from '@/hooks/clientStateHooks/useClickOutside';
import useGetProfileInfo from '@/hooks/serverStateHooks/useGetProfileInfo';
import TokenHandler from '@/utils/tokenHandler';

const NavbarUserOption = () => {
  const router = useRouter();
  const [toggleOptionArea, setToggleOptionArea] = useState(false);

  const userId = TokenHandler.getUserIdFromToken();
  const { userInfo } = useGetProfileInfo(userId);

  const targetRef = useClickOutside<HTMLDivElement>(() => {
    setToggleOptionArea(false);
  });

  const clickSignOut = () => {
    TokenHandler.removeToken();
    router.push(ROUTE.signIn);
    setToggleOptionArea(false);
  };

  const clickProfileButton = () => {
    router.push(ROUTE.profile(userId));
    setToggleOptionArea(false);
  };

  return (
    <div className='relative flex align-center' ref={targetRef}>
      <button
        type='button'
        onClick={() => setToggleOptionArea((prev) => !prev)}
      >
        <Image
          src={userInfo.profileImage || '/images/defaultProfileImage.png'}
          alt={
            userInfo.profileImage ? 'profile image' : 'default profile image'
          }
          className='object-cover rounded-full aspect-square flex-shrink-0'
          width={50}
          height={50}
        />
      </button>
      {toggleOptionArea && (
        <div className='absolute -left-[191px] top-[70px] w-[327px] h-[342px] bg-background-overlay text-white rounded-2xl'>
          <div className='absolute top-[-8px] left-2/3 transform -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[15px] border-b-background-overlay' />
          <div className='flex flex-col h-full subtitle1'>
            <div className='flex gap-10 mb-[26px] p-[30px] items-center'>
              <Image
                src={userInfo.profileImage || '/images/defaultProfileImage.png'}
                alt={
                  userInfo.profileImage
                    ? 'profile image'
                    : 'default profile image'
                }
                className='object-cover rounded-full aspect-square flex-shrink-0'
                width={71}
                height={71}
              />
              <div className='button-m'>{userInfo.nickname}</div>
            </div>
            <button
              className='flex-1 flex items-center px-[40px] py-[30px] hover:bg-[##1B1A1D]'
              onClick={clickProfileButton}
            >
              내 프로필
            </button>
            <button
              className='flex-1 flex items-center px-[40px] py-[30px] hover:bg-[##1B1A1D]'
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
