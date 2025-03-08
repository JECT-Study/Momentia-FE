'use client';

import FollowUserUnit from '@/components/Modal/FollowInfoModal/FollowUserUnit';
import useGetFollowerList from '@/hooks/server/useGetFollowerList';
import useToastStore from '@/stores/useToastStore';

const FollowerList = ({ nickname }: { nickname: string }) => {
  const { followerList, isLoading, isError } = useGetFollowerList();
  const { showToast } = useToastStore();

  if (isLoading) return <div>로딩 중...</div>;

  if (isError) showToast('error', '팔로워 목록 조회에 실패하였습니다.');

  return (
    <>
      {followerList.length === 0 ? (
        <div className='button-l w-full tablet:pr-[58px] text-center pb-[45px] text-white'>
          팔로워가 없습니다.
        </div>
      ) : (
        <>
          <p className='button-m text-white mt-[25px] mb-[55px]'>
            <span className='hidden tablet:inline-block mr-2.5'>
              {nickname} 님의
            </span>
            {`팔로워 ${followerList.length}`}
          </p>
          <div className='flex-1 overflow-auto scroll-hide'>
            {followerList.map((follower) => (
              <FollowUserUnit
                key={follower.userId}
                followStatus={follower.isFollow}
                {...follower}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default FollowerList;
