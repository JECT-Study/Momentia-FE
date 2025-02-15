import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useStore } from 'zustand';

import FollowButton from '@/components/Button/FollowButton';
import ROUTE from '@/constants/routes';
import modalStore from '@/stores/modalStore';

interface FollowUserUnitProps {
  userId: number;
  profileImage: string | null;
  nickname: string;
  introduction: string | null;
  followStatus: boolean | null;
}

const FollowUserUnit = ({
  userId,
  profileImage,
  nickname,
  introduction,
  followStatus,
}: FollowUserUnitProps) => {
  const router = useRouter();
  const { closeModal } = useStore(modalStore);

  const moveToProfilePage = () => {
    router.push(ROUTE.profile(userId));
    closeModal();
  };

  return (
    <div className='flex justify-between items-center py-[27px] tablet:py-[18px] tablet:pr-[45px]'>
      <button
        type='button'
        className='group flex gap-[33px] tablet:gap-[53px] items-center'
        onClick={moveToProfilePage}
      >
        <Image
          src={profileImage || '/images/defaultProfileImage.png'}
          alt={profileImage ? 'user-profile-image' : 'default-profile'}
          className='rounded-full tablet:w-[94px] h-14 tablet:h-[94px] aspect-square'
          width={56}
          height={56}
        />
        <div className='text-start'>
          <p className='placeholder text-white mb-[4px] group-hover:underline'>
            {nickname}
          </p>
          <p className='button-s text-gray-500'>{introduction ?? ''}</p>
        </div>
      </button>
      <FollowButton initFollowState={followStatus} followUserId={userId} />
    </div>
  );
};

export default FollowUserUnit;
