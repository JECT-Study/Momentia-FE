import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import getProfileInfo from '@/apis/user/getProfileInfo';
import { UserType } from '@/types/user';

const useGetProfileInfo = () => {
  const searchParams = useSearchParams();
  const userId = Number(searchParams.get('userId') || 0);

  const { data, isLoading } = useQuery({
    queryKey: [],
    queryFn: () => getProfileInfo(userId),
    initialData: {
      isMine: false,
      email: '',
      followerCount: 0,
      followingCount: 0,
      userId: 0,
      profileImage: '',
      nickname: '',
      introduction: '',
      isFollow: false,
      field: '',
    } as UserType,
  });

  return { userInfo: data, isLoading };
};

export default useGetProfileInfo;
