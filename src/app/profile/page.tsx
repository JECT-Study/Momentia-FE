'use client';

import { useSearchParams } from 'next/navigation';

import UserInfoSection from '@/components/ProfilePage/UserInfoSection';
import useGetProfileInfo from '@/hooks/server/useGetProfileInfo';
import useToastStore from '@/stores/useToastStore';

import UserArtworkSection from '../../components/ProfilePage/UserArtworkSection';

const ProfilePage = () => {
  const searchParams = useSearchParams();
  const userIdParam = searchParams.get('userId');
  const userId = userIdParam ? Number(userIdParam) : null;

  const { userInfo, isLoading, isError } = useGetProfileInfo(userId);
  const { showToast } = useToastStore();

  if (isLoading) return <div>Loading</div>;

  if (isError) showToast('error', '프로필 정보 조회에 실패하였습니다.');

  return (
    <div className='flex flex-col flex-grow gap-[70px] w-full max-w-[1920px] m-auto py-[70px] px-[32px]'>
      <UserInfoSection userInfo={userInfo} />
      <UserArtworkSection isMine={userInfo.isMine} />
    </div>
  );
};

export default ProfilePage;
