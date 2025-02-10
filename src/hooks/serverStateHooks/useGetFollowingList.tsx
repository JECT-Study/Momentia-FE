import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import getFollowingList from '@/apis/follow/getFollowingList';
import { USER } from '@/constants/API';
import { FollowUser } from '@/types/user';

const useGetFollowingList = () => {
  const searchParams = useSearchParams();
  const userIdParam = searchParams.get('userId');
  const userId = userIdParam ? Number(userIdParam) : null;

  const { data, isLoading } = useQuery({
    queryKey: [USER.followingList(userId as number)],
    queryFn: () => getFollowingList(userId as number),
    enabled: !!userId,
  });

  return {
    followingList: data !== undefined ? data.users : ([] as FollowUser[]),
    isLoading,
  };
};

export default useGetFollowingList;
