'use client';

import useGetFollowingList from '@/hooks/server/useGetFollowingList';
import useToastStore from '@/stores/useToastStore';

import FollowUserUnit from './FollowUserUnit';

const FollowingList = ({ nickname }: { nickname: string }) => {
  const { showToast } = useToastStore();
  const { followingList, isLoading, isError } = useGetFollowingList();

  if (isLoading) return <div>로딩 중...</div>;

  if (isError) showToast('error', '팔로잉 목록 조회에 실패하였습니다.');

  return (
    <>
      {followingList.length === 0 ? (
        <div className='button-l w-full tablet:pr-[58px] text-center pb-[45px] text-white'>
          팔로우한 작가가 없습니다.
        </div>
      ) : (
        <>
          <p className='button-m text-white mt-[25px] mb-[55px]'>
            <span className='hidden tablet:inline-block mr-2.5'>
              {nickname} 님의
            </span>
            {`팔로잉 ${followingList.length}`}
          </p>
          <div className='flex-1 overflow-auto scroll-hide'>
            {followingList.map((following) => (
              <FollowUserUnit
                key={following.userId}
                followStatus={following.isFollow}
                {...following}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default FollowingList;
