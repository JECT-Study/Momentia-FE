import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useStore } from 'zustand';

import DefaultProfile from '@/../public/images/defaultProfileImage.png';
import FollowButton from '@/components/Button/FollowButton';
import ROUTE from '@/constants/routes';
import modalStore from '@/stores/modalStore';

interface FollowUserUnitProps {
  userId: number;
  profileImage: string;
  nickname: string;
  introduction: string;
  followStatus: boolean;
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
          src={profileImage || DefaultProfile}
          alt={profileImage ? 'user-profile-image' : 'default-profile'}
          className='rounded-full w-14 tablet:w-[94px] h-14 tablet:h-[94px]'
        />
        <div>
          <p className='placeholder text-white mb-[4px] group-hover:underline'>
            {nickname}
          </p>
          <p className='button-s text-gray-500'>{introduction}fdsfafsdfas</p>
        </div>
      </button>
      <FollowButton initFollowState={followStatus} followUserId={userId} />
    </div>
  );
};

export default FollowUserUnit;
