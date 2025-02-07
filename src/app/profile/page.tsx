'use client';

import useGetProfileInfo from '@/hooks/serverStateHooks/useGetProfileInfo';

import UserArtworkSection from '../../components/ProfilePage/UserArtworkSection';

const ProfilePage = () => {
  const { userInfo, isLoading } = useGetProfileInfo();

  if (isLoading) return <div>Loading</div>;

  return (
    <div className='flex flex-col flex-grow gap-[70px] w-full max-w-[1920px] m-auto py-[70px] tablet:px-[140px] px-[32px]'>
      <UserArtworkSection isMine={userInfo.isMine} />
    </div>
  );
};

export default ProfilePage;
