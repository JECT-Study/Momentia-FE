import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import getFollowingList from '@/apis/follow/getFollowingList';
import { USER } from '@/constants/API';

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
    followingList: data?.users ?? [],
    isLoading,
  };
};

export default useGetFollowingList;
