import { useQuery } from '@tanstack/react-query';

import getProfileInfo from '@/apis/user/getProfileInfo';
import { UserType } from '@/types/user';

const useGetProfileInfo = (userId: number) => {
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
    enabled: userId !== 0,
  });

  return { userInfo: data, isLoading };
};

export default useGetProfileInfo;
