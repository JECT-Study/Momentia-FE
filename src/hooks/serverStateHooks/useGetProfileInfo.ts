import { useQuery } from '@tanstack/react-query';

import getProfileInfo from '@/apis/user/getProfileInfo';
import { USER } from '@/constants/API';
import { UserType } from '@/types/user';

const useGetProfileInfo = (userId: number | null) => {
  const { data, isLoading } = useQuery({
    queryKey: [USER.userProfile, userId],
    queryFn: () => {
      if (userId === null) {
        throw new Error('userId is required');
      }
      return getProfileInfo(userId);
    },
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
      userField: '',
    } as UserType,
    enabled: !!userId,
  });

  return { userInfo: data, isLoading };
};

export default useGetProfileInfo;
