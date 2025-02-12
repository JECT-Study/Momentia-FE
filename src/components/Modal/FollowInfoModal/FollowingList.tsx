'use client';

import useGetFollowingList from '@/hooks/serverStateHooks/useGetFollowingList';

import FollowUserUnit from './FollowUserUnit';

const FollowingList = ({ nickname }: { nickname: string }) => {
  const { followingList, isLoading } = useGetFollowingList();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {followingList.length === 0 ? (
        <div className='button-l w-full tablet:pr-[58px] text-center pb-[45px] text-white'>
          팔로잉한 작가가 없습니다.
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
                followStatus={false}
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
