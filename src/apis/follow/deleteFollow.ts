import { isAxiosError } from 'axios';

import { ARTWORK, USER } from '@/constants/API';
import {
  COMMON_ERROR_MESSAGE,
  FOLLOW_ERROR_MESSAGE,
} from '@/constants/errorMessage';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authorizedClient } from '..';
import postFollow from './postFollow';

const deleteFollow = async (userId: number) => {
  try {
    const response = await authorizedClient.delete(USER.follow, {
      data: { userId },
    });

    if (response.status === 204) {
      return true;
    } else {
      throw new Error('팔로우 취소 요청 실패');
    }
  } catch (error) {
    if (isAxiosError<ErrorResponseType<null>>(error) && error.response) {
      const { code } = error;

      if (code) {
        console.error(FOLLOW_ERROR_MESSAGE[code]);
        throw new Error(FOLLOW_ERROR_MESSAGE[code]);
      } else {
        console.error(COMMON_ERROR_MESSAGE.UNKNOWN_ERROR);
        throw new Error(COMMON_ERROR_MESSAGE.UNKNOWN_ERROR);
      }
    } else {
      console.error(COMMON_ERROR_MESSAGE.NETWORK_ERROR);
      throw new Error(COMMON_ERROR_MESSAGE.NETWORK_ERROR);
    }
  }
};

const useToggleFollow = (
  isFollowing: boolean,
  setIsFollowing: (value: boolean) => void,
) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (userId: number) => {
      isFollowing === true
        ? await deleteFollow(userId)
        : await postFollow(userId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ARTWORK.followedArtists],
      });
      setIsFollowing(!isFollowing);
    },

    onError: (error) => {
      console.error('팔로우 상태 변경 에러: ', error.message);
    },
  });
};

export default useToggleFollow;
