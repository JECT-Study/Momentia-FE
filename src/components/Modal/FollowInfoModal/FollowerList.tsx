'use client';

import FollowUserUnit from '@/components/Modal/FollowInfoModal/FollowUserUnit';
import useGetFollowerList from '@/hooks/serverStateHooks/useGetFollowerList';

const FollowerList = ({ nickname }: { nickname: string }) => {
  const { followerList, isLoading } = useGetFollowerList();

  if (isLoading) return <div>isLoading</div>;

  return (
    <div className='pr-[26px] tablet:pr-[45px]'>
      {followerList.length === 0 ? (
        <div className='button-l w-full h-[900px] tablet:pr-[58px] text-center leading-[900px] pb-[45px] text-white'>
          팔로우한 작가가 없습니다.
        </div>
      ) : (
        <>
          <p className='button-m text-white mt-[25px] mb-[55px]'>
            <span className='hidden tablet:block'>{nickname} 님의</span>
            {`팔로워 ${followerList.length}`}
          </p>
          <div className='h-[900px] pb-[46px] overflow-auto scroll-hide'>
            {followerList.map((follower) => (
              <FollowUserUnit
                key={follower.userId}
                followStatus={false}
                {...follower}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FollowerList;
