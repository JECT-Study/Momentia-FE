import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import getFollowerList from '@/apis/follow/getFollowerList';
import { USER } from '@/constants/API';
import { FollowUser } from '@/types/user';

const useGetFollowerList = () => {
  const searchParams = useSearchParams();
  const userIdParam = searchParams.get('userId');
  const userId = userIdParam ? Number(userIdParam) : null;

  const { data, isLoading } = useQuery({
    queryKey: [USER.followerList(userId as number)],
    queryFn: () => getFollowerList(userId as number),
  });

  return {
    followerList: data !== undefined ? data.users : ([] as FollowUser[]),
    isLoading,
  };
};

export default useGetFollowerList;
